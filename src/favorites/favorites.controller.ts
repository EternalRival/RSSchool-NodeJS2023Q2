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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ParseUUIDV4Pipe } from '../shared/pipes/parse-uuid-v4.pipe';
import { isDatabaseError } from '../shared/helpers/is-database-error';
import { Favorites } from './dto/favorites-response.dto';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  private logger = new Logger('Favorites');
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Favorites,
    isArray: true,
  })
  private findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example:
            'the track 3fa85f64-5717-4562-b3fc-2c963f66afa6 was added to favorites',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist",
  })
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
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
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
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example:
            'the album 3fa85f64-5717-4562-b3fc-2c963f66afa6 was added to favorites',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist",
  })
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
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
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
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example:
            'the artist 3fa85f64-5717-4562-b3fc-2c963f66afa6 was added to favorites',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist",
  })
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
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
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
