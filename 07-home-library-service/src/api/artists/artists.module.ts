import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Module({
  imports: [FavoritesModule, TypeOrmModule.forFeature([Artist, Album, Track])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
