import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { Album } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../tracks/entities/track.entity';

@Module({
  imports: [FavoritesModule, TypeOrmModule.forFeature([Album, Track])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
