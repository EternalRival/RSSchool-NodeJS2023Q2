import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface TrackInterface {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class Track implements TrackInterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'The Show Must Go On' })
  name: string;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  artistId: string | null;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  albumId: string | null;

  @ApiProperty({ description: 'In seconds', example: 262 })
  duration: number;
}
