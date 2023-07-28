import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IdNotFoundError } from '../shared/id-not-found.error';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createArtistDto: CreateAlbumDto) {
    const entity = this.albumsService.create(createArtistDto);
    return entity;
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return entity;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateAlbumDto,
  ) {
    const entity = this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const updated = this.albumsService.update(id, updateArtistDto);

    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.albumsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const deleted = this.albumsService.remove(entity);

    return deleted;
  }
}
