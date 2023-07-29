import { ApiPropertyOptional } from '@nestjs/swagger';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

export interface FavoritesInterface {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class Favorites implements FavoritesResponse {
  @ApiPropertyOptional({ type: Artist, isArray: true })
  artists: Artist[];

  @ApiPropertyOptional({ type: Album, isArray: true })
  albums: Album[];

  @ApiPropertyOptional({ type: Track, isArray: true })
  tracks: Track[];
}
