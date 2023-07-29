import { Injectable } from '@nestjs/common';
import { DB } from '../fake-db/db.service';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class FavoritesService {
  albumsRepository = DB.albumsRepository;
  artistsRepository = DB.artistsRepository;
  tracksRepository = DB.tracksRepository;
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    const response: FavoritesResponse = { artists: [], albums: [], tracks: [] };

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
