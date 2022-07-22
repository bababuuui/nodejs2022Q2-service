import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryStore } from '../db/in-memory-store';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto) {
    const track = new Track();
    track.id = uuid();
    track.name = createTrackDto.name;
    track.duration = createTrackDto.duration;
    track.artistId = createTrackDto.artistId || null;
    track.albumId = createTrackDto.albumId || null;
    InMemoryStore.tracks.push(track);
    return track;
  }

  findAll() {
    return InMemoryStore.tracks;
  }

  findOne(id: string) {
    const track = InMemoryStore.tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException();
    } else {
      return track;
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto.artistId || null;
    track.albumId = updateTrackDto.albumId || null;
    //update in db
    const index = InMemoryStore.tracks.indexOf(track);
    InMemoryStore.tracks[index] = track;
    return track;
  }

  remove(id: string) {
    const track = this.findOne(id);
    if (track) {
      InMemoryStore.tracks = InMemoryStore.tracks.filter((item) => item.id !== id);
    }
  }
}
