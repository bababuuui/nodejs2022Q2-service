import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity('track')
export class Track {
  constructor() {
    this.artistId = null;
    this.albumId = null;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  duration: number; // integer number
  @ManyToOne(() => Artist, (Artist) => Artist.id, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  artistId: string | null; // refers to Artist
  @ManyToOne(() => Album, (Album) => Album.id, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  albumId: string | null; // refers to Album
}
