import { Injectable } from '@nestjs/common';
import { DB } from '../fake-db/db.service';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  artistsRepository = DB.artistsRepository;
  albumsRepository = DB.albumsRepository;
  tracksRepository = DB.tracksRepository;

  create(createAlbumDto: CreateAlbumDto) {
    const album = { ...createAlbumDto, id: v4() };

    return this.albumsRepository.save(album);
  }

  findAll() {
    return this.albumsRepository.find();
  }

  findOne(id: string) {
    return this.albumsRepository.findOneBy({ id });
  }

  update(id: string, updateData: Partial<Album>) {
    const entity = this.albumsRepository.findOneBy({ id });
    return this.albumsRepository.save({ ...entity, ...updateData });
  }

  remove(album: Album) {
    const deleted = this.albumsRepository.remove(album);

    const tracks = this.tracksRepository.find({ albumId: album.id });
    tracks.forEach((track) => {
      track.albumId = null;
    });

    return deleted;
  }
}
