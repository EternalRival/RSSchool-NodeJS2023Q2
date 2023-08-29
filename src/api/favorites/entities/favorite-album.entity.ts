import { Album } from '../../albums/entities/album.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Favorite } from '../interfaces/favorite.interface';

@Entity()
export class FavoriteAlbum implements Favorite<Album> {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  public favorite: Album;
}
