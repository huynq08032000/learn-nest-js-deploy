import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
