import { Track } from '../../tracks/entities/track.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Favorite } from '../interfaces/favorite.interface';

@Entity()
export class FavoriteTrack implements Favorite<Track> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn()
  public favorite: Track;
}
