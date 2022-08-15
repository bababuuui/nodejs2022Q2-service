import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track, User])],
  controllers: [AlbumsController],
  providers: [AlbumsService, AuthService, UsersService, JwtService],
})
export class AlbumsModule {}
