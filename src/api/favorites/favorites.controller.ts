import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpException,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';
import { ApiTags } from '@nestjs/swagger';
import { ParseUUIDV4Pipe } from '../../shared/pipes/parse-uuid-v4.pipe';
import { isDatabaseError } from '../../shared/helpers/is-database-error';
import { Favorites } from './dto/favorites-response.dto';
import { ApiFindAll, ApiCreate, ApiDelete } from './decorators';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  private logger = new Logger('Favorites');
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiFindAll({ name: 'Favorite', type: Favorites })
  private findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @ApiCreate({ name: 'Track' })
  private async createFavoriteTrack(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<{ message: string }> {
    try {
      const entity = await this.favoritesService.createFavoriteTrack(id);
      return {
        message: `the track ${entity.favorite.id} was added to favorites`,
      };
    } catch (error) {
      if (isDatabaseError(error)) {
        if (error.detail?.includes('is not present in table')) {
          const response = `track with \`id === ${id}\` doesn't exist`;
          throw new HttpException(response, StatusCodes.UNPROCESSABLE_ENTITY);
        }
        if (error.detail?.includes('already exists')) {
          return { message: `the track ${id} was added to favorites` };
        }
        this.logger.error(error.detail);
      }
      this.logger.error(error.message);
      throw error;
    }
  }

  @Delete('/track/:id')
  @ApiDelete({ name: 'Track' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async removeFavoriteTrack(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity = await this.favoritesService.findFavoriteTrack(id);

    if (!entity) {
      const response = 'corresponding track is not favorite';
      throw new HttpException(response, StatusCodes.NOT_FOUND);
    }

    await this.favoritesService.removeFavoriteTrack(entity);
  }

  @Post('/album/:id')
  @ApiCreate({ name: 'Album' })
  private async createFavoriteAlbum(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<{ message: string }> {
    try {
      const entity = await this.favoritesService.createFavoriteAlbum(id);
      return {
        message: `the album ${entity.favorite.id} was added to favorites`,
      };
    } catch (error) {
      if (isDatabaseError(error)) {
        if (error.detail?.includes('is not present in table')) {
          const response = `album with \`id === ${id}\` doesn't exist`;
          throw new HttpException(response, StatusCodes.UNPROCESSABLE_ENTITY);
        }
        if (error.detail?.includes('already exists')) {
          return { message: `the album ${id} was added to favorites` };
        }
        this.logger.error(error.detail);
      }
      this.logger.error(error.message);
      throw error;
    }
  }

  @Delete('/album/:id')
  @ApiDelete({ name: 'Album' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async removeFavoriteAlbum(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity = await this.favoritesService.findFavoriteAlbum(id);

    if (!entity) {
      const response = 'corresponding album is not favorite';
      throw new HttpException(response, StatusCodes.NOT_FOUND);
    }

    await this.favoritesService.removeFavoriteAlbum(entity);
  }

  @Post('/artist/:id')
  @ApiCreate({ name: 'Artist' })
  private async createFavoriteArtist(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<{ message: string }> {
    try {
      const entity = await this.favoritesService.createFavoriteArtist(id);
      return {
        message: `the artist ${entity.favorite.id} was added to favorites`,
      };
    } catch (error) {
      if (isDatabaseError(error)) {
        if (error.detail?.includes('is not present in table')) {
          const response = `artist with \`id === ${id}\` doesn't exist`;
          throw new HttpException(response, StatusCodes.UNPROCESSABLE_ENTITY);
        }
        if (error.detail?.includes('already exists')) {
          return { message: `the artist ${id} was added to favorites` };
        }
        this.logger.error(error.detail);
      }
      this.logger.error(error.message);
      throw error;
    }
  }

  @Delete('/artist/:id')
  @ApiDelete({ name: 'Artist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async removeFavoriteArtist(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity = await this.favoritesService.findFavoriteArtist(id);

    if (!entity) {
      const response = 'corresponding artist is not favorite';
      throw new HttpException(response, StatusCodes.NOT_FOUND);
    }

    await this.favoritesService.removeFavoriteArtist(entity);
  }
}
