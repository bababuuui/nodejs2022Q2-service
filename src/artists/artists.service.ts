import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';
import { InMemoryStore } from '../db/in-memory-store';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user';
import { Repository } from 'typeorm';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = new Artist();
    artist.id = uuid();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    return await this.artistRepository.save(artist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException();
    } else {
      return artist;
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return await this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    if (artist) {
      // await this.trackRepository.delete({ artistId: artist.id });
      // await this.albumRepository.delete({ artistId: artist.id });
      await this.artistRepository.delete(id);
    }
  }
}
