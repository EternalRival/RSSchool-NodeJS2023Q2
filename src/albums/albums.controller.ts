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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
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
import { Album } from './entities/album.entity';
import { ParseUUIDV4Pipe } from '../shared/pipes/parse-uuid-v4.pipe';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiBody({ type: CreateAlbumDto })
  @ApiCreatedResponse({ description: 'Album is created', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  private create(@Body() createAlbumDto: CreateAlbumDto): Album {
    const entity: Album = this.albumsService.create(createAlbumDto);
    return entity;
  }

  @Get()
  @ApiOperation({
    summary: 'Get album list',
    description: 'Gets all library album list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Album,
    isArray: true,
  })
  private findAll(): Album[] {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  private findOne(@Param('id', ParseUUIDV4Pipe) id: string): Album {
    const entity: Album | null = this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return entity;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiOkResponse({ description: 'The album has been updated', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  private update(
    @Param('id', ParseUUIDV4Pipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    const entity: Album | null = this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const updated: Album | null = this.albumsService.update(id, updateAlbumDto);

    if (!updated) {
      throw new IdNotFoundError(id);
    }

    return updated;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Deletes album from library',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private remove(@Param('id', ParseUUIDV4Pipe) id: string): void {
    const entity: Album | null = this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    this.favoritesService.remove('albums', id);
    this.albumsService.remove(entity);
  }
}
