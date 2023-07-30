import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface AlbumInterface {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class Album implements AlbumInterface {
  @ApiProperty({ format: 'uuid' })
  public id: string;

  @ApiProperty({ example: 'Innuendo' })
  public name: string;

  @ApiPropertyOptional({ example: 1991 })
  public year: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  public artistId: string | null;
}
