import { User } from '../users/entities/user';
import { Artist } from '../artists/entities/artist.entity';

export class InMemoryStore {
  public static users: User[] = [];
  public static tracks: User[] = [];
  public static albums: User[] = [];
  public static artists: Artist[] = [];
}
