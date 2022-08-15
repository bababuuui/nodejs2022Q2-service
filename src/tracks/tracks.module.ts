import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user';
import { CustomLogger } from '../common/utils/logging/custom-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, User])],
  controllers: [TracksController],
  providers: [TracksService, AuthService, UsersService, JwtService, CustomLogger],
})
export class TracksModule {}
