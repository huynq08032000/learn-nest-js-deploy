import { Task } from './common/tasks.entity';
import { Repository } from 'typeorm';

export class TasksRepository extends Repository<Task> {}
