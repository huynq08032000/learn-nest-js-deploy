import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskDto, UpdateTaskDto } from './common/tasks.dto';
import { Task } from './common/tasks.entity';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/common/get-user.decorator';
import { User } from '../auth/common/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getAllTasks(user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: TaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Patch('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateTaskById(id, updateTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.deleteTaskById(id, user);
  }
}
