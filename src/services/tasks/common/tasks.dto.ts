/* eslint-disable indent */
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from './tasks.enum';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
