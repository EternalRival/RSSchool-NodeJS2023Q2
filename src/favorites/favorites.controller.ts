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
import { Favorites } from './entities/favorites.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
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
  private findAll(): Favorites {
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
  private createFavoriteTrack(@Param('id', ParseUUIDPipe) id: string): {
    message: string;
  } {
    const entity: string | null = this.favoritesService.create('tracks', id);

    if (!entity) {
      throw new HttpException(
        `track with \`id === ${id}\` doesn't exist`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return { message: `the track ${id} was added to favorites` };
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
  private removeFavoriteTrack(@Param('id', ParseUUIDPipe) id: string): void {
    const entity = this.favoritesService.remove('tracks', id);

    if (!entity) {
      throw new HttpException(
        'corresponding track is not favorite',
        StatusCodes.NOT_FOUND,
      );
    }
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
  private createFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string): {
    message: string;
  } {
    const entity: string | null = this.favoritesService.create('albums', id);

    if (!entity) {
      throw new HttpException(
        `album with \`id === ${id}\` doesn't exist`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return { message: `the album ${id} was added to favorites` };
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
  private removeFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    const entity: string | null = this.favoritesService.remove('albums', id);

    if (!entity) {
      throw new HttpException(
        'corresponding album is not favorite',
        StatusCodes.NOT_FOUND,
      );
    }
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
  private createFavoriteArtist(@Param('id', ParseUUIDPipe) id: string): {
    message: string;
  } {
    const entity: string | null = this.favoritesService.create('artists', id);

    if (!entity) {
      throw new HttpException(
        `artist with \`id === ${id}\` doesn't exist`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return { message: `the artist ${id} was added to favorites` };
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
  private removeFavoriteArtist(@Param('id', ParseUUIDPipe) id: string): void {
    const entity: string | null = this.favoritesService.remove('artists', id);

    if (!entity) {
      throw new HttpException(
        'corresponding artist is not favorite',
        StatusCodes.NOT_FOUND,
      );
    }
  }
}
