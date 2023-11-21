import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TaskDto, UpdateTaskDto } from './common/tasks.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TASKS_TABLE_NAME, Task } from './common/tasks.entity';
import { StatusEnum } from './common/tasks.enum';
import { Not } from 'typeorm';
import { User } from '../auth/common/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
  ) {}
  private tasks: Task[] = [];

  async getAllTasks(user: User): Promise<Task[]> {
    const query = await this.tasksRepository.createQueryBuilder(
      TASKS_TABLE_NAME,
    );
    query.where({ user });
    query.andWhere(`${TASKS_TABLE_NAME}.status NOT IN (:status)`, {
      status: StatusEnum.DELETE,
    });
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // const taskFound = await this.tasksRepository.findOne({
    //   where: {
    //     id,
    //     status: Not(StatusEnum.DELETE),
    //     user: {
    //       id: user.id,
    //     },
    //   },
    // });
    const query = await this.tasksRepository.createQueryBuilder(
      TASKS_TABLE_NAME,
    );
    query.where({ user });
    query.andWhere(
      `(${TASKS_TABLE_NAME}.status NOT IN (:status) AND ${TASKS_TABLE_NAME}.id = :id)`,
      {
        status: StatusEnum.DELETE,
        id,
      },
    );
    const taskFound = await query.getOne();
    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound;
  }

  async createTask(createTaskDto: TaskDto, user: User): Promise<Task> {
    // return this.tasksRepository.createTask(createTaskDto);
    const { title, description } = createTaskDto;
    const newTask = this.tasksRepository.create({
      title,
      description,
      status: StatusEnum.NEW,
      user,
    });

    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const taskFound = await this.getTaskById(id, user);
    const newTask = await this.tasksRepository.save({
      ...taskFound,
      ...updateTaskDto,
    });
    return newTask;
  }
  async deleteTaskById(id: string, user: User): Promise<any> {
    try {
      await this.updateTaskById(
        id,
        {
          status: StatusEnum.DELETE,
        },
        user,
      );
      return 'Delete successfull';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
