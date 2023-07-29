import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface AlbumInterface {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class Album implements AlbumInterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Innuendo' })
  name: string;

  @ApiPropertyOptional({ example: 1991 })
  year: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  artistId: string | null;
}
