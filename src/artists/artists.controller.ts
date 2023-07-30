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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
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
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist information',
  })
  @ApiBody({ type: CreateArtistDto })
  @ApiCreatedResponse({ description: 'Artist is created', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  private create(@Body() createArtistDto: CreateArtistDto): Artist {
    const entity: Artist = this.artistsService.create(createArtistDto);
    return entity;
  }

  @Get()
  @ApiOperation({
    summary: 'Get artist list',
    description: 'Gets all library artist list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Artist,
    isArray: true,
  })
  private findAll(): Artist[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  private findOne(@Param('id', ParseUUIDPipe) id: string): Artist {
    const entity: Artist | null = this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return entity;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update library artist information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateArtistDto })
  @ApiOkResponse({ description: 'The artist has been updated', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  private update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    const entity: Artist | null = this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const updated: Artist | null = this.artistsService.update(
      id,
      updateArtistDto,
    );

    if (!updated) {
      throw new IdNotFoundError(id);
    }

    return updated;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Deletes artist from library',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private remove(@Param('id', ParseUUIDPipe) id: string): void {
    const entity: Artist | null = this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    this.favoritesService.remove('artists', id);

    this.artistsService.remove(entity);
  }
}
