import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { IdNotFoundError } from '../shared/id-not-found.error';
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
  private create(@Body() createTrackDto: CreateTrackDto): Track {
    const entity: Track = this.tracksService.create(createTrackDto);

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
  private findAll(): Track[] {
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
  private findOne(@Param('id', ParseUUIDPipe) id: string): Track {
    const entity: Track | null = this.tracksService.findOne(id);

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
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    const entity: Track | null = this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const updated: Track | null = this.tracksService.update(id, updateTrackDto);

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
  private remove(@Param('id', ParseUUIDPipe) id: string): void {
    const entity: Track | null = this.tracksService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    this.favoritesService.remove('tracks', id);

    this.tracksService.remove(entity);
  }
}
