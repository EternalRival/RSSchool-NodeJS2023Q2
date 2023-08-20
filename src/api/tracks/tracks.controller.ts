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
import { ApiTags } from '@nestjs/swagger';
import { Track } from './entities/track.entity';
import { ParseUUIDV4Pipe } from '../../shared/pipes/parse-uuid-v4.pipe';
import {
  ApiCreate,
  ApiFindAll,
  ApiFind,
  ApiUpdate,
  ApiDelete,
} from '../../shared/decorators';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiCreate({ name: 'Track', type: Track, dto: CreateTrackDto })
  private async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    const entity: Track = await this.tracksService.create(createTrackDto);

    return entity;
  }

  @Get()
  @ApiFindAll({ name: 'Track', type: Track })
  private findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiFind({ name: 'Track', type: Track })
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
  @ApiUpdate({ name: 'Track', type: Track, dto: UpdateTrackDto })
  private async update(
    @Param('id', ParseUUIDV4Pipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const entity: Track | null = await this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    const updated: Track | null = await this.tracksService.update(
      id,
      updateTrackDto,
    );

    if (!updated) {
      throw new IdNotFoundException(id);
    }

    return updated;
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
