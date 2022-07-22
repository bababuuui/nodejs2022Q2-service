import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { MESSAGES } from '../common/enums/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Repository } from 'typeorm';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Favorites } from './entities/favorites.entity';
//temporary before authentication and ability to login to diferent user accounts is implemented
const USER_ID = 1;
@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => AlbumsService))
  private readonly albumsService: AlbumsService;
  @Inject(forwardRef(() => ArtistsService))
  private readonly artistsService: ArtistsService;
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;

  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>
  ) {}

  private getDefaultFavsObj = () => {
    const favorites = new Favorites();
    favorites.artists = [];
    favorites.tracks = [];
    favorites.albums = [];
    return favorites;
  };

  async findOneAndCreateDefaultIfNotExist() {
    const fav = await this.findOne();
    return fav ? fav : this.getDefaultFavsObj();
  }
  private async findOne(id = USER_ID) {
    const fav = await this.favoritesRepository.findOne({
      // relations: ['albums', 'artists', 'tracks'],
      where: { userId: id },
    });
    const result = fav ? fav : this.getDefaultFavsObj();
    // this code should never be written
    result.albums.map((item) => {
      if (item.artistId) item.artistId = item.artistId['id'];
    });
    result.tracks.map((item) => {
      if (item.artistId) item.artistId = item.artistId['id'];
      if (item.albumId) item.albumId = item.albumId['id'];
    });
    return result;
  }

  async addAlbum(id: string) {
    const fav = await this.findOneAndCreateDefaultIfNotExist();
    try {
      const album = await this.albumsService.findOne(id);
      console.log(album);
      fav.albums.push(album);
    } catch (e) {
      console.log(e);
      throw new UnprocessableEntityException('Album' + MESSAGES.DOESNT_EXIST);
    }
    await this.favoritesRepository.save(fav);
  }
  async addTrack(id: string) {
    const fav = await this.findOneAndCreateDefaultIfNotExist();
    try {
      const track = await this.tracksService.findOne(id);
      fav.tracks.push(track);
    } catch (e) {
      console.log(e);
      throw new UnprocessableEntityException('Track' + MESSAGES.DOESNT_EXIST);
    }
    await this.favoritesRepository.save(fav);
  }

  async addArtist(id: string) {
    const fav = await this.findOneAndCreateDefaultIfNotExist();
    try {
      const artist = await this.artistsService.findOne(id);
      fav.artists.push(artist);
    } catch (e) {
      console.log(e);
      throw new UnprocessableEntityException('Artist' + MESSAGES.DOESNT_EXIST);
    }
    await this.favoritesRepository.save(fav);
  }

  async removeAlbum(id: string) {
    const fav = await this.findOneAndCreateDefaultIfNotExist();
    const album = fav.albums.find((item) => item.id === id);
    if (!album) {
      throw new NotFoundException(MESSAGES.ID_IS_NOT_IN_FAVS);
    }
    fav.albums = fav.albums.filter((item) => item.id !== id);
    await this.favoritesRepository.save(fav);
  }

  async removeArtist(id: string) {
    const fav = await this.findOneAndCreateDefaultIfNotExist();
    const artist = fav.artists.find((item) => item.id === id);
    if (!artist) {
      throw new NotFoundException(MESSAGES.ID_IS_NOT_IN_FAVS);
    }
    fav.artists = fav.artists.filter((item) => item.id !== id);
    await this.favoritesRepository.save(fav);
  }

  async removeTrack(id: string) {
    const fav = await this.findOneAndCreateDefaultIfNotExist();
    const track = fav.tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException(MESSAGES.ID_IS_NOT_IN_FAVS);
    }
    fav.tracks = fav.tracks.filter((item) => item.id !== id);
    await this.favoritesRepository.save(fav);
  }
}
