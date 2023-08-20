import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { TracksModule } from './api/tracks/tracks.module';
import { ArtistsModule } from './api/artists/artists.module';
import { AlbumsModule } from './api/albums/albums.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { LoggingModule } from './logging/logging.module';
import { toNumber } from './shared/helpers/to-number';
import { LoggingMiddleware } from './logging/logging.middleware';
import { AuthModule } from './api/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessGuard } from './api/auth/guards/access.guard';
import { CustomExceptionFilter } from './shared/filters/custom-exception.filter';
import { HttpResponseInterceptor } from './shared/interceptors/http-response.interceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { WhiteListPipe } from './shared/pipes/whitelist.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        username: configService.get('PGUSER', 'hls-user'),
        password: configService.get('PGPASSWORD', 'hls-password'),
        host: configService.get('PGHOST', 'localhost'),
        port: toNumber(configService.get('PGPORT')) ?? 5432,
        database: configService.get('PGDATABASE', 'hls-db'),
        synchronize: false,
        entities: [`${__dirname}/**/*.entity.js`],
        migrations: [`${__dirname}/database/migrations/*.js`],
        migrationsRun: true,
      }),
    }),
    JwtModule,
    LoggingModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AccessGuard },
    { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
    { provide: APP_PIPE, useClass: WhiteListPipe },
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
