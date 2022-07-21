import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('favorite')
export class Favorites {
  @PrimaryColumn({ default: 1 })
  @Exclude()
  userId: number;
  // @Column({ array: true })
  // artists: string;
  // @Column({ array: true })
  // albums: string;
  // @Column({ array: true })
  // tracks: string;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Artist[];
  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Album[];
  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];
}
