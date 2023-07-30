import { Injectable } from '@nestjs/common';
import { DB } from '../fake-db/db.service';
import { Favorites, FavoritesInterface } from './entities/favorites.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Repository } from '../fake-db/repository.service';

type Entity = Album | Artist | Track;

@Injectable()
export class FavoritesService {
  private albumsRepository: Repository<Album> = DB.albumsRepository;
  private artistsRepository: Repository<Artist> = DB.artistsRepository;
  private tracksRepository: Repository<Track> = DB.tracksRepository;
  private favorites: FavoritesInterface = {
    artists: [],
    albums: [],
    tracks: [],
  };

  public findAll(): Favorites {
    const response: Favorites = { artists: [], albums: [], tracks: [] };

    Object.entries(this.favorites).forEach(([key, list]) => {
      const repo = this[`${key}Repository`];
      response[key] = list.map((id: string) => repo.findOneBy({ id }));
    });

    return response;
  }

  public create(path: keyof Favorites, id: string): string | null {
    const entity: Entity | null = this[`${path}Repository`].findOneBy({ id });

    if (!entity) {
      return null;
    }

    this.favorites[path].push(id);

    return id;
  }

  public remove(path: keyof Favorites, id: string): string | null {
    const entity: Entity | null = this[`${path}Repository`].findOneBy({ id });

    if (!entity) {
      return null;
    }

    this.favorites[path] = this.favorites[path].filter(
      (item: string) => id !== item,
    );

    return id;
  }
}
