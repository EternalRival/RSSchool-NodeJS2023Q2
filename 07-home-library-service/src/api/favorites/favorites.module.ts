import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbum, FavoriteArtist, FavoriteTrack } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteArtist, FavoriteAlbum, FavoriteTrack]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
