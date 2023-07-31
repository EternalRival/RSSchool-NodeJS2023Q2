import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .build();

  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('/doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(configService.get('PORT', 4000));
}

bootstrap();
