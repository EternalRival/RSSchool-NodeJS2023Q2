import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from './repository.service';

export const DB = {
  usersRepository: new Repository<User>(),
  artistsRepository: new Repository<Artist>(),
  tracksRepository: new Repository<Track>(),
  albumsRepository: new Repository<Album>(),
};
