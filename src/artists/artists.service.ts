import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 } from 'uuid';
import { DB } from '../fake-db/db.service';
import { Artist } from './entities/artist.entity';
import { Repository } from '../fake-db/repository.service';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class ArtistsService {
  private artistsRepository: Repository<Artist> = DB.artistsRepository;
  private albumsRepository: Repository<Album> = DB.albumsRepository;
  private tracksRepository: Repository<Track> = DB.tracksRepository;

  public create(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = { ...createArtistDto, id: v4() };

    return this.artistsRepository.save(artist);
  }

  public findAll(): Artist[] {
    return this.artistsRepository.find();
  }

  public findOne(id: string): Artist | null {
    return this.artistsRepository.findOneBy({ id });
  }

  public update(id: string, updateData: Partial<Artist>): Artist | null {
    const entity: Artist | null = this.artistsRepository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return this.artistsRepository.save({ ...entity, ...updateData });
  }

  public remove(artist: Artist): Artist {
    const deleted: Artist = this.artistsRepository.remove(artist);

    const tracks: Track[] = this.tracksRepository.find({ artistId: artist.id });
    tracks.forEach((track) => {
      track.artistId = null;
    });

    const albums: Album[] = this.albumsRepository.find({ artistId: artist.id });
    albums.forEach((album) => {
      album.artistId = null;
    });

    return deleted;
  }
}
