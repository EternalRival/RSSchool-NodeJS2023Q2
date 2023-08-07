import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

interface ArtistInterface {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

@Entity()
export class Artist implements ArtistInterface {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'Freddie Mercury' })
  @Column()
  public name: string;

  @ApiPropertyOptional({ example: false })
  @Column()
  public grammy: boolean;
}
