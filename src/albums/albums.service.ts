import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from '../albums/entities/album.entity';
import { InMemoryStore } from '../db/in-memory-store';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user';
import { Repository } from 'typeorm';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album();
    album.id = uuid();
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId || null;
    return await this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ loadRelationIds: true, where: { id } });
    if (!album) {
      throw new NotFoundException();
    } else {
      return album;
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    //update in db
    // const index = InMemoryStore.albums.indexOf(album);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return await this.albumRepository.save(album);
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    if (album) {
      // await this.trackRepository.delete({ albumId: album.id });
      await this.albumRepository.delete(id);
    }
  }
}
