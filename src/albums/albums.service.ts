import { Injectable } from '@nestjs/common';
import { DB } from '../fake-db/db.service';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { Repository } from '../fake-db/repository.service';

@Injectable()
export class AlbumsService {
  private albumsRepository: Repository<Album> = DB.albumsRepository;
  private tracksRepository: Repository<Track> = DB.tracksRepository;

  public create(createAlbumDto: CreateAlbumDto): Album {
    const album: Album = { ...createAlbumDto, id: v4() };

    return this.albumsRepository.save(album);
  }

  public findAll(): Album[] {
    return this.albumsRepository.find();
  }

  public findOne(id: string): Album | null {
    return this.albumsRepository.findOneBy({ id });
  }

  public update(id: string, updateData: Partial<Album>): Album | null {
    const entity: Album | null = this.albumsRepository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return this.albumsRepository.save({ ...entity, ...updateData });
  }

  public remove(album: Album): Album {
    const deleted: Album = this.albumsRepository.remove(album);

    const tracks: Track[] = this.tracksRepository.find({ albumId: album.id });
    tracks.forEach((track) => {
      track.albumId = null;
    });

    return deleted;
  }
}
