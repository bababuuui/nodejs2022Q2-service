import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CustomLogger } from '../common/utils/logging/custom-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, UsersService, JwtService, CustomLogger],
})
export class UsersModule {}
