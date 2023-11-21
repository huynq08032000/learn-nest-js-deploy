/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { StatusEnum } from './tasks.enum';
import { User } from 'src/services/auth/common/user.entity';
import { Exclude } from 'class-transformer';

export const TASKS_TABLE_NAME = 'task_table';
@Entity({ name: TASKS_TABLE_NAME })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    title: string;

  @Column()
    description: string;

  @Column()
    status: StatusEnum;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
    user: User;
}
