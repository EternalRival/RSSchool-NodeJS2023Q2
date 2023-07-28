import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 } from 'uuid';
import { DB } from '../fake-db/db.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  artistsRepository = DB.artistsRepository;
  albumsRepository = DB.albumsRepository;
  tracksRepository = DB.tracksRepository;

  create(createArtistDto: CreateArtistDto) {
    const track = { ...createArtistDto, id: v4() };

    return this.artistsRepository.save(track);
  }

  findAll() {
    return this.artistsRepository.find();
  }

  findOne(id: string) {
    return this.artistsRepository.findOneBy({ id });
  }

  update(id: string, updateData: Partial<Artist>) {
    const entity = this.artistsRepository.findOneBy({ id });
    return this.artistsRepository.save({ ...entity, ...updateData });
  }

  remove(artist: Artist) {
    const deleted = this.artistsRepository.remove(artist);

    const tracks = this.tracksRepository.find({ artistId: artist.id });
    tracks.forEach((track) => {
      track.artistId = null;
    });

    const albums = this.albumsRepository.find({ artistId: artist.id });
    albums.forEach((album) => {
      album.artistId = null;
    });

    return deleted;
  }
}
