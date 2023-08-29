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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { IdNotFoundException } from '../../shared/exceptions/id-not-found.exception';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';
import { ParseUUIDV4Pipe } from '../../shared/pipes/parse-uuid-v4.pipe';
import {
  ApiCreate,
  ApiFindAll,
  ApiFind,
  ApiUpdate,
  ApiDelete,
} from '../../shared/decorators';
import { isDatabaseError } from '../../shared/helpers/is-database-error';
import { EntityNotExistException } from '../../shared/exceptions/entity-not-exist.exception';

@ApiTags('Tracks')
@ApiBearerAuth()
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiCreate({ name: 'Track', responseType: Track, bodyType: CreateTrackDto })
  @ApiUnprocessableEntityResponse({
    description: "album with albumId or artist with artistId doesn't exists",
  })
  private async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      const entity: Track = await this.tracksService.create(createTrackDto);
      return entity;
    } catch (error) {
      if (
        isDatabaseError(error) &&
        error.detail?.includes('is not present in table')
      ) {
        throw new EntityNotExistException(error.detail);
      }
      throw error;
    }
  }

  @Get()
  @ApiFindAll({ name: 'Track', responseType: Track })
  private findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiFind({ name: 'Track', responseType: Track })
  private async findOne(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<Track> {
    const entity: Track | null = await this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    return entity;
  }

  @Put(':id')
  @ApiUpdate({ name: 'Track', responseType: Track, bodyType: UpdateTrackDto })
  @ApiUnprocessableEntityResponse({
    description: "album with albumId or artist with artistId doesn't exists",
  })
  private async update(
    @Param('id', ParseUUIDV4Pipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const entity: Track | null = await this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    try {
      const updated: Track | null = await this.tracksService.update(
        id,
        updateTrackDto,
      );

      if (!updated) {
        throw new IdNotFoundException(id);
      }

      return updated;
    } catch (error) {
      if (
        isDatabaseError(error) &&
        error.detail?.includes('is not present in table')
      ) {
        throw new EntityNotExistException(error.detail);
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiDelete({ name: 'Track' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async remove(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity: Track | null = await this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    await this.tracksService.remove(entity);
  }
}
