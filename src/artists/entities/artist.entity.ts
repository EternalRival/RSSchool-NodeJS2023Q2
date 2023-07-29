import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface ArtistInterface {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class Artist implements ArtistInterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Freddie Mercury' })
  name: string;

  @ApiPropertyOptional({ example: false })
  grammy: boolean;
}
