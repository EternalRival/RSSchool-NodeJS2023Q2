import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

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

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  public artistId: string | null;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  public albumId: string | null;

  @ApiProperty({ description: 'In seconds', example: 262 })
  @Column()
  public duration: number;
}
