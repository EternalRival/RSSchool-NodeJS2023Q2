import { PickType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PickType(CreateTrackDto, [
  'albumId',
  'artistId',
  'duration',
  'name',
]) {}
