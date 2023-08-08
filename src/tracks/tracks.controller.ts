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
import { IdNotFoundError } from '../shared/errors/id-not-found.error';
import { FavoritesService } from '../favorites/favorites.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';
import { ParseUUIDV4Pipe } from '../shared/pipes/parse-uuid-v4.pipe';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiBody({ type: CreateTrackDto })
  @ApiCreatedResponse({ description: 'Track is created', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  private async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    const entity: Track = await this.tracksService.create(createTrackDto);

    return entity;
  }

  @Get()
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Track,
    isArray: true,
  })
  private findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Get single track by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  private async findOne(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<Track> {
    const entity: Track | null = await this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return entity;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateTrackDto })
  @ApiOkResponse({ description: 'The track has been updated', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  private async update(
    @Param('id', ParseUUIDV4Pipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const entity: Track | null = await this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const updated: Track | null = await this.tracksService.update(
      id,
      updateTrackDto,
    );

    if (!updated) {
      throw new IdNotFoundError(id);
    }

    return updated;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete track',
    description: 'Deletes track from library',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async remove(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity: Track | null = await this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    await this.tracksService.remove(entity);
  }
}
