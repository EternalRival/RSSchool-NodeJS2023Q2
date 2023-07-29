import { Injectable } from '@nestjs/common';
import { DB } from '../fake-db/db.service';
import { Favorites, FavoritesInterface } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  albumsRepository = DB.albumsRepository;
  artistsRepository = DB.artistsRepository;
  tracksRepository = DB.tracksRepository;
  favorites: FavoritesInterface = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    const response: Favorites = { artists: [], albums: [], tracks: [] };

    Object.entries(this.favorites).forEach(([key, list]) => {
      const repo = this[`${key}Repository`];
      response[key] = list.map((id: string) => repo.findOneBy({ id }));
    });

    return response;
  }

  create(path: keyof Favorites, id: string) {
    const entity = this[`${path}Repository`].findOneBy({ id });
    if (!entity) {
      return null;
    }

    this.favorites[path].push(id);

    return id;
  }

  remove(path: keyof Favorites, id: string) {
    const entity = this[`${path}Repository`].findOneBy({ id });
    if (!entity) {
      return null;
    }

    this.favorites[path] = this.favorites[path].filter(
      (item: string) => id !== item,
    );

    return id;
  }
}
