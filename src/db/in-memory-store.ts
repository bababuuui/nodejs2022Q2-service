import { User } from '../users/entities/user';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';

export class InMemoryStore {
  public static users: User[] = [];
  public static tracks: User[] = [];
  public static albums: Album[] = [];
  public static artists: Artist[] = [];
}
