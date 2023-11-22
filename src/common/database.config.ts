import { User } from 'src/services/auth/common/user.entity';
import { Task } from 'src/services/tasks/common/tasks.entity';

export const databaseConfig: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'LearnNestJSV2',
  autoLoadEntities: true,
  synchronize: true,
  entities: [Task, User],
};

export const databaseConfigMySql: any = {
  type: 'mysql',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '123456',
  database: 'LearnNestJSV2',
  synchronize: true,
  entities: [Task, User],
};
