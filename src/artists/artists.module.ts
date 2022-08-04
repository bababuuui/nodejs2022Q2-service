import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user';
import { CustomLogger } from '../common/utils/logging/custom-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Track, Album, User])],
  controllers: [ArtistsController],
  providers: [ArtistsService, AuthService, UsersService, JwtService, CustomLogger],
})
export class ArtistsModule {}
