import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './services/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, databaseConfigMySql } from './common/database.config';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigMySql),
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
