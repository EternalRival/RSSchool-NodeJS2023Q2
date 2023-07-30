import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { DB } from '../fake-db/db.service';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import { Repository } from '../fake-db/repository.service';

@Injectable()
export class TracksService {
  private tracksRepository: Repository<Track> = DB.tracksRepository;

  public create(createTrackDto: CreateTrackDto): Track {
    const track = { ...createTrackDto, id: v4() };

    return this.tracksRepository.save(track);
  }

  public findAll(): Track[] {
    return this.tracksRepository.find();
  }

  public findOne(id: string): Track | null {
    return this.tracksRepository.findOneBy({ id });
  }

  public update(id: string, updateData: Partial<Track>): Track | null {
    const entity = this.tracksRepository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return this.tracksRepository.save({ ...entity, ...updateData });
  }

  public remove(track: Track): Track {
    return this.tracksRepository.remove(track);
  }
}
