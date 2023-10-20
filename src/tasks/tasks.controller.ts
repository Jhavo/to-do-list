import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return new TaskEntity(await this.tasksService.create(createTaskDto));
  }

  @Get()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return tasks.map((task) => new TaskEntity(task));
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new TaskEntity(await this.tasksService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskEntity })
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return new TaskEntity(await this.tasksService.update(id, updateTaskDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new TaskEntity(await this.tasksService.remove(id));
  }
}
