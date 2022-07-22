import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('album')
export class Album {
  constructor() {
    this.artistId = null;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  year: number;
  @ManyToOne(() => Artist, (Artist) => Artist.id, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  artistId: string | null; // refers to Artist
}
