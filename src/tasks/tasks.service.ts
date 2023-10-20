import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Redis from 'ioredis';

@Injectable()
export class TasksService {
  private redisClient: Redis;

  constructor(private prismaService: PrismaService) {}

  onApplicationBootstrap() {
      this.redisClient = new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
      });
  }

  create(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({ data: createTaskDto });
  }

  findAll() {
    return this.prismaService.task.findMany({ where: { active: true }});
  }

  findOne(id: number) {
    return this.prismaService.task.findUnique({ where: { id }});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const userId = await this.redisClient.get('userId');

    if (updateTaskDto.assignedTo !== Number(userId)) {
      throw new Error('You can only modify tasks that were assigned to you.');
    }

    return this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({ where: { id }});
  }
}
