import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [PrismaModule],
})
export class TasksModule {}
