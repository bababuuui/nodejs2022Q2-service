import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from '../albums/entities/album.entity';
import { InMemoryStore } from '../db/in-memory-store';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album();
    album.id = uuid();
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId || null;
    InMemoryStore.albums.push(album);
    return album;
  }

  findAll() {
    return InMemoryStore.albums;
  }

  findOne(id: string) {
    const album = InMemoryStore.albums.find((item) => item.id === id);
    if (!album) {
      throw new NotFoundException();
    } else {
      return album;
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    //update in db
    const index = InMemoryStore.albums.indexOf(album);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    InMemoryStore.albums[index] = album;
    return album;
  }

  remove(id: string) {
    const album = this.findOne(id);
    if (album) {
      InMemoryStore.albums = InMemoryStore.albums.filter((item) => item.id !== id);
      InMemoryStore.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
    }
  }
}
