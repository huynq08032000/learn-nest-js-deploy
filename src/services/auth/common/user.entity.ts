/* eslint-disable prettier/prettier */
import { type } from 'os';
import { Task } from 'src/services/tasks/common/tasks.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity({ name: 'user_table' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ unique: true })
    username: string;

  @Column()
    password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  @Exclude({ toPlainOnly: true })
    tasks: Task[];
}
