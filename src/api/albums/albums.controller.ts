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
import { IdNotFoundException } from '../../shared/exceptions/id-not-found.exception';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';
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

@ApiTags('Albums')
@ApiBearerAuth()
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiCreate({ name: 'Album', type: Album, dto: CreateAlbumDto })
  @ApiUnprocessableEntityResponse({
    description: "artist with artistId doesn't exists",
  })
  private async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const entity: Album = await this.albumsService.create(createAlbumDto);
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
  @ApiFindAll({ name: 'Album', type: Album })
  private findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiFind({ name: 'Album', type: Album })
  private async findOne(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<Album> {
    const entity: Album | null = await this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    return entity;
  }

  @Put(':id')
  @ApiUpdate({ name: 'Album', type: Album, dto: UpdateAlbumDto })
  @ApiUnprocessableEntityResponse({
    description: "artist with artistId doesn't exists",
  })
  private async update(
    @Param('id', ParseUUIDV4Pipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const entity: Album | null = await this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    try {
      const updated: Album | null = await this.albumsService.update(
        id,
        updateAlbumDto,
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
  @ApiDelete({ name: 'Album' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async remove(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity: Album | null = await this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    await this.albumsService.remove(entity);
  }
}
