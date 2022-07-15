import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InMemoryStore } from '../db/in-memory-store';
import { IFavouritesResponse } from './interfaces/IFavouritesResponse';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { MESSAGES } from '../common/enums/messages';

@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => AlbumsService))
  private readonly albumsService: AlbumsService;
  @Inject(forwardRef(() => ArtistsService))
  private readonly artistsService: ArtistsService;
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;

  findAll() {
    const result: IFavouritesResponse = {
      artists: this.artistsService.findAll().filter((item) => InMemoryStore.favourites.artists.includes(item.id)),
      albums: this.albumsService.findAll().filter((item) => InMemoryStore.favourites.albums.includes(item.id)),
      tracks: this.tracksService.findAll().filter((item) => InMemoryStore.favourites.tracks.includes(item.id)),
    };
    return result;
  }

  addAlbum(id: string) {
    // if (this.albumsService.findOne(id)) {
    //   InMemoryStore.favourites.albums.push(id);
    // } else {
    //   throw new UnprocessableEntityException('Album' + MESSAGES.DOESNT_EXIST);
    // }
    try {
      this.albumsService.findOne(id);
      InMemoryStore.favourites.albums.push(id);
    } catch (e) {
      throw new UnprocessableEntityException('Album' + MESSAGES.DOESNT_EXIST);
    }
  }
  addTrack(id: string) {
    // if (this.tracksService.findOne(id)) {
    //   InMemoryStore.favourites.tracks.push(id);
    // } else {
    //   throw new UnprocessableEntityException('Track' + MESSAGES.DOESNT_EXIST);
    // }
    try {
      this.tracksService.findOne(id);
      InMemoryStore.favourites.tracks.push(id);
    } catch (e) {
      throw new UnprocessableEntityException('Track' + MESSAGES.DOESNT_EXIST);
    }
  }

  addArtist(id: string) {
    try {
      this.artistsService.findOne(id);
      InMemoryStore.favourites.artists.push(id);
    } catch (e) {
      throw new UnprocessableEntityException('Artist' + MESSAGES.DOESNT_EXIST);
    }
    // if (this.artistsService.findOne(id)) {
    //   InMemoryStore.favourites.artists.push(id);
    // } else {
    //   throw new UnprocessableEntityException('Artist' + MESSAGES.DOESNT_EXIST);
    // }
  }

  removeAlbum(id: string) {
    const album = InMemoryStore.favourites.albums.find((el) => el === id);
    if (album) {
      InMemoryStore.favourites.albums = InMemoryStore.favourites.albums.filter((item) => item !== id);
    } else {
      throw new NotFoundException(MESSAGES.ID_IS_NOT_IN_FAVS);
    }
  }

  removeArtist(id: string) {
    const artist = InMemoryStore.favourites.artists.find((el) => el === id);
    if (artist) {
      InMemoryStore.favourites.artists = InMemoryStore.favourites.artists.filter((item) => item !== id);
    } else {
      throw new NotFoundException(MESSAGES.ID_IS_NOT_IN_FAVS);
    }
  }

  removeTrack(id: string) {
    const track = InMemoryStore.favourites.tracks.find((el) => el === id);
    if (track) {
      InMemoryStore.favourites.tracks = InMemoryStore.favourites.tracks.filter((item) => item !== id);
    } else {
      throw new NotFoundException(MESSAGES.ID_IS_NOT_IN_FAVS);
    }
  }
}
