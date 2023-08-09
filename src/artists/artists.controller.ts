import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IdNotFoundError } from '../shared/errors/id-not-found.error';
import { ApiTags } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';
import { ParseUUIDV4Pipe } from '../shared/pipes/parse-uuid-v4.pipe';
import {
  ApiCreate,
  ApiFindAll,
  ApiFind,
  ApiUpdate,
  ApiDelete,
} from '../shared/decorators';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiCreate({ name: 'Artist', type: Artist, dto: CreateArtistDto })
  private async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const entity: Artist = await this.artistsService.create(createArtistDto);
    return entity;
  }

  @Get()
  @ApiFindAll({ name: 'Artist', type: Artist })
  private findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiFind({ name: 'Artist', type: Artist })
  private async findOne(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<Artist> {
    const entity: Artist | null = await this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return entity;
  }

  @Put(':id')
  @ApiUpdate({ name: 'Artist', type: Artist, dto: UpdateArtistDto })
  private async update(
    @Param('id', ParseUUIDV4Pipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const entity: Artist | null = await this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const updated: Artist | null = await this.artistsService.update(
      id,
      updateArtistDto,
    );

    if (!updated) {
      throw new IdNotFoundError(id);
    }

    return updated;
  }

  @Delete(':id')
  @ApiDelete({ name: 'Artist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async remove(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity: Artist | null = await this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    await this.artistsService.remove(entity);
  }
}
