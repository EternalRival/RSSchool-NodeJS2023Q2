import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteAlbum, FavoriteArtist, FavoriteTrack } from './entities';
import { Favorite } from './interfaces/favorite.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteArtist)
    private favoriteArtistRepository: Repository<FavoriteArtist>,
    @InjectRepository(FavoriteAlbum)
    private favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteTrack)
    private favoriteTrackRepository: Repository<FavoriteTrack>,
  ) {}

  public async findAll() {
    const promises = [
      this.favoriteArtistRepository,
      this.favoriteAlbumRepository,
      this.favoriteTrackRepository,
    ].map((repo) => repo.find({ relations: { favorite: true } }));

    const results = await Promise.allSettled<Favorite[]>(promises);
    const [artists, albums, tracks] = results.map((result) => {
      return result.status === 'fulfilled'
        ? result.value.map((v) => v.favorite)
        : [];
    });

    return { artists, albums, tracks };
  }

  public findFavoriteArtist(id: string) {
    return this.favoriteArtistRepository.findOneBy({ favorite: { id } });
  }
  public findFavoriteAlbum(id: string) {
    return this.favoriteAlbumRepository.findOneBy({ favorite: { id } });
  }
  public findFavoriteTrack(id: string) {
    return this.favoriteTrackRepository.findOneBy({ favorite: { id } });
  }

  public createFavoriteArtist(id: string) {
    return this.favoriteArtistRepository.save({ favorite: { id } });
  }
  public createFavoriteAlbum(id: string) {
    return this.favoriteAlbumRepository.save({ favorite: { id } });
  }
  public createFavoriteTrack(id: string) {
    return this.favoriteTrackRepository.save({ favorite: { id } });
  }

  public removeFavoriteArtist(favoriteArtist) {
    return this.favoriteArtistRepository.remove(favoriteArtist);
  }
  public removeFavoriteAlbum(favoriteAlbum) {
    return this.favoriteAlbumRepository.remove(favoriteAlbum);
  }
  public removeFavoriteTrack(favoriteTrack) {
    return this.favoriteTrackRepository.remove(favoriteTrack);
  }
}
