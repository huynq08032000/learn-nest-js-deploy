import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './common/user.dto';
import { User } from './common/user.entity';
import { generateDuplicateMessage, isEqualErrorCode } from 'src/common/ultis';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCreate: UserCreateDto): Promise<User> {
    try {
      const { username, password } = userCreate;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.usersRepository.create({
        username,
        password: hashedPassword,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      if (isEqualErrorCode(error, 23505)) {
        throw new ConflictException(generateDuplicateMessage('Username'));
      }
      throw new InternalServerErrorException();
    }
  }
  async signIn(
    userCreate: UserCreateDto,
  ): Promise<{ user: User; accessToken: string }> {
    try {
      const { username, password } = userCreate;
      const user = await this.usersRepository.findOne({
        where: {
          username,
        },
      });
      if (user && (await bcrypt.compare(password, user?.password))) {
        const payload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        return { user, accessToken };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      if (isEqualErrorCode(error, 401))
        throw new UnauthorizedException('Please check your login credentials');
      else throw new InternalServerErrorException();
    }
  }
}
