import { User } from '../users/entities/user.entity';
import { Repository } from './repository.service';

export const DB = {
  usersRepository: new Repository<User>(),
  artistsRepository: new Repository(),
  tracksRepository: new Repository(),
  albumsRepository: new Repository(),
};
