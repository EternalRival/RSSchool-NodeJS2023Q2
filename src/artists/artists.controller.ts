import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createArtistDto: CreateArtistDto) {
    const entity = this.artistsService.create(createArtistDto);
    return entity;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Artist,
    isArray: true,
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return entity;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const entity = this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const updated = this.artistsService.update(id, updateArtistDto);

    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.artistsService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    this.favoritesService.remove('artists', id);

    const deleted = this.artistsService.remove(entity);

    return deleted;
  }
}
