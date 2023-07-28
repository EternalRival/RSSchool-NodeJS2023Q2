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

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createArtistDto: CreateArtistDto) {
    const entity = this.artistsService.create(createArtistDto);
    return entity;
  }

  @Get()
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

    const deleted = this.artistsService.remove(entity);

    return deleted;
  }
}
