import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  createFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.favoritesService.create('tracks', id);

    if (!entity) {
      throw new HttpException(
        `track with \`id === ${id}\` doesn't exist`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return `the track ${id} was added to favorites`;
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.favoritesService.remove('tracks', id);

    if (!entity) {
      throw new HttpException(
        'corresponding track is not favorite',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  @Post('/album/:id')
  createFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.favoritesService.create('albums', id);

    if (!entity) {
      throw new HttpException(
        `album with \`id === ${id}\` doesn't exist`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return `the album ${id} was added to favorites`;
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.favoritesService.remove('albums', id);

    if (!entity) {
      throw new HttpException(
        'corresponding album is not favorite',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  @Post('/artist/:id')
  createFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.favoritesService.create('artists', id);

    if (!entity) {
      throw new HttpException(
        `artist with \`id === ${id}\` doesn't exist`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return `the artist ${id} was added to favorites`;
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.favoritesService.remove('artists', id);

    if (!entity) {
      throw new HttpException(
        'corresponding artist is not favorite',
        StatusCodes.NOT_FOUND,
      );
    }
  }
}
