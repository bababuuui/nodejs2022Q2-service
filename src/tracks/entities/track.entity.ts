import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  duration: number; // integer number
  @ManyToOne(() => Artist, (Artist) => Artist.id, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  artistId: string | null; // refers to Artist
  @ManyToOne(() => Album, (Album) => Album.id, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  albumId: string | null; // refers to Album
}
