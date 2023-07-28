import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    // todo POST /track - create new track
    // todo Server should answer with status code 201 and newly created record if request is valid
    // todo Server should answer with status code 400 and corresponding message if request body does not contain required fields
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    // todo GET /track - get all tracks
    // todo Server should answer with status code 200 and all tracks records
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // todo GET /track/:id - get single track by id
    // todo Server should answer with status code 200 and and record with id === trackId if it exists
    // todo Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
    // todo Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
    return this.tracksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    // todo PUT /track/:id - update track info
    // todo Server should answer with status code 200 and updated record if request is valid
    // todo Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
    // todo Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
    return this.tracksService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo DELETE /track/:id - delete track
    // todo Server should answer with status code 204 if the record is found and deleted
    // todo Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
    // todo Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
    return this.tracksService.remove(+id);
  }
}
