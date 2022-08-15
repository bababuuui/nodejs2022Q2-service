import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorites } from './entities/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track, Artist, Favorites])],
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistsService, AlbumsService, TracksService],
})
export class FavoritesModule {}
