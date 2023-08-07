import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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

  // TODO relations
  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @Column({ type: 'uuid', nullable: true })
  public artistId: string | null;
}
