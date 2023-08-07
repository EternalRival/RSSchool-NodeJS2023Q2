import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';

import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private tracksRepository: Repository<Track>,
  ) {}

  public create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksRepository.save(createTrackDto);
  }

  public findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  public findOne(id: string): Promise<Track | null> {
    return this.tracksRepository.findOneBy({ id });
  }

  public async update(
    id: string,
    updateData: Partial<Track>,
  ): Promise<Track | null> {
    const entity: Track | null = await this.tracksRepository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return this.tracksRepository.save({ ...entity, ...updateData });
  }

  public remove(track: Track): Promise<Track> {
    return this.tracksRepository.remove(track);
  }
}
