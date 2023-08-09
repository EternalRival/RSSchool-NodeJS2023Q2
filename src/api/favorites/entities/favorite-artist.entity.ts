import { Artist } from '../../artists/entities/artist.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Favorite } from '../interfaces/favorite.interface';

@Entity()
export class FavoriteArtist implements Favorite<Artist> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  public favorite: Artist;
}
