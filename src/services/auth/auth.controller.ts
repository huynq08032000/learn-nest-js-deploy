import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './common/user.dto';
import { User } from './common/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() createUser: UserCreateDto): Promise<User> {
    return this.authService.signUp(createUser);
  }
  @Post('/signin')
  signIn(
    @Body() createUser: UserCreateDto,
  ): Promise<{ user: User; accessToken: string }> {
    return this.authService.signIn(createUser);
  }
}
