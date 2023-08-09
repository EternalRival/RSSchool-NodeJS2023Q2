import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
  ) {}

  public create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsRepository.save(createArtistDto);
  }

  public findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  public findOne(id: string): Promise<Artist | null> {
    return this.artistsRepository.findOneBy({ id });
  }

  public async update(
    id: string,
    updateData: Partial<Artist>,
  ): Promise<Artist | null> {
    const entity: Artist | null = await this.artistsRepository.findOneBy({
      id,
    });

    if (!entity) {
      return null;
    }

    return this.artistsRepository.save({ ...entity, ...updateData });
  }

  public remove(artist: Artist): Promise<Artist> {
    return this.artistsRepository.remove(artist);
  }
}
