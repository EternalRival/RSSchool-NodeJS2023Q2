import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumsRepository: Repository<Album>,
    @InjectRepository(Track) private tracksRepository: Repository<Track>,
  ) {}

  public create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsRepository.save(createAlbumDto);
  }

  public findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  public findOne(id: string): Promise<Album | null> {
    return this.albumsRepository.findOneBy({ id });
  }

  public async update(
    id: string,
    updateData: Partial<Album>,
  ): Promise<Album | null> {
    const entity: Album | null = await this.albumsRepository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return this.albumsRepository.save({ ...entity, ...updateData });
  }

  public async remove(album: Album): Promise<Album> {
    const deleted: Album = await this.albumsRepository.remove(album);

    const tracks: Track[] = await this.tracksRepository.find({
      where: { albumId: album.id },
    });
    tracks.forEach((track) => {
      track.albumId = null;
    });

    return deleted;
  }
}
