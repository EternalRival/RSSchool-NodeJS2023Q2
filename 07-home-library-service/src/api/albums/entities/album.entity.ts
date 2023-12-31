import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

interface AlbumInterface {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

@Entity()
export class Album implements AlbumInterface {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'Innuendo' })
  @Column()
  public name: string;

  @ApiPropertyOptional({ example: 1991 })
  @Column()
  public year: number;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  public artistId: string | null;
}
