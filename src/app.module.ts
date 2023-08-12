import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { TracksModule } from './api/tracks/tracks.module';
import { ArtistsModule } from './api/artists/artists.module';
import { AlbumsModule } from './api/albums/albums.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        host: configService.get('PGHOST'),
        port: configService.get('PGPORT'),
        database: configService.get('PGDATABASE'),
        synchronize: false,
        entities: [`${__dirname}/**/*.entity.js`],
        migrations: [`${__dirname}/database/migrations/*.js`],
        migrationsRun: true,
      }),
    }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
