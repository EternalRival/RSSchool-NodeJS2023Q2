import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface TrackInterface {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

@Entity()
export class Track implements TrackInterface {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'The Show Must Go On' })
  @Column()
  public name: string;

  // TODO relations
  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  public artistId: string | null;

  // TODO relations
  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  public albumId: string | null;

  @ApiProperty({ description: 'In seconds', example: 262 })
  @Column()
  public duration: number;
}
