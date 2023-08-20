import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { toNumber } from './shared/helpers/to-number';
import { emitUnhandledErrors } from './shared/helpers/emit-unhandled-errors';

function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/doc', app, swaggerDocument);
}

function initUnhandledRejectionUncaughtExceptionHandlers(
  logger: LoggingService,
): void {
  process.on('uncaughtException', (error: Error) => {
    logger.error(error.message, error.stack, 'UncaughtException');
    // process.exit(1); // doesn't work with nestjs --watch mode
  });
  process.on('unhandledRejection', (reason: unknown) => {
    logger.error(reason, null, 'UnhandledRejection');
  });
}

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const logger = app.get(LoggingService);
  const loggingLevel = toNumber(configService.get('LOGGING_LEVEL')) ?? 5;
  logger.setLogLevelsByNumber(loggingLevel);

  initUnhandledRejectionUncaughtExceptionHandlers(logger);

  app.useLogger(logger);

  setupSwagger(app);

  const port = toNumber(configService.get('PORT')) ?? 4000;
  await app.listen(port, () => {
    logger.log(`Server started at port: ${port}`, 'PORT');
  });

  //? comment or remove it after uncaughtException and unhandledRejection check
  emitUnhandledErrors(3000).then((res) => logger.verbose(...res));
}

bootstrap();
