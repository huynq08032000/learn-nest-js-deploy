import { User } from './common/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository extends Repository<User> {}
