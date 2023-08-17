import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { CustomHttpExceptionFilter } from './shared/filters/custom-exception.filter';
import { toNumber } from './shared/helpers/to-number';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const logger = app.get(LoggingService);
  const loggingLevel = toNumber(configService.get('LOGGING_LEVEL')) ?? 5;
  logger.setLogLevelsByNumber(loggingLevel);
  app.useLogger(logger);

  const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.1.0')
    .build();

  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('/doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalFilters(new CustomHttpExceptionFilter());

  const port = toNumber(configService.get('PORT')) ?? 4000;

  await app.listen(port, () => {
    new Logger('PORT').log(`Server started at port: ${port}`);
  });
}

bootstrap();
