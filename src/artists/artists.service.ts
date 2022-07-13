import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';
import { InMemoryStore } from '../db/in-memory-store';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist();
    artist.id = uuid();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    InMemoryStore.artists.push(artist);
    return artist;
  }

  findAll() {
    return InMemoryStore.artists;
  }

  findOne(id: string) {
    const artist = InMemoryStore.artists.find((item) => item.id === id);
    if (!artist) {
      throw new NotFoundException();
    } else {
      return artist;
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    //update in db
    const index = InMemoryStore.artists.indexOf(artist);
    InMemoryStore.artists[index] = artist;
    return artist;
  }

  remove(id: string) {
    const artist = this.findOne(id);
    if (artist) {
      InMemoryStore.artists = InMemoryStore.artists.filter((item) => item.id !== id);
    }
  }
}
