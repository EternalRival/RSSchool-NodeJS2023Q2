import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { DB } from '../fake-db/db.service';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  tracksRepository = DB.tracksRepository;

  create(createTrackDto: CreateTrackDto) {
    const track = { ...createTrackDto, id: v4() };

    return this.tracksRepository.save(track);
  }

  findAll() {
    return this.tracksRepository.find();
  }

  findOne(id: string) {
    return this.tracksRepository.findOneBy({ id });
  }

  update(id: string, updateData: Partial<Track>) {
    const entity = this.tracksRepository.findOneBy({ id });
    return this.tracksRepository.save({ ...entity, ...updateData });
  }

  remove(id: string) {
    return this.tracksRepository.remove({ id });
  }
}
