import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { toNumber } from './shared/helpers/to-number';
import { emitUnhandledErrors } from './shared/helpers/emit-unhandled-errors';

function setupSwagger(app: INestApplication): void {
  const publicEndpoints = ['auth/signup', 'auth/login', '/doc', '/']
    .map((endpoint) => `\`${endpoint}\``)
    .join(', ');

  const description = `
#### All endpoints (except ${publicEndpoints}) are protected with JWT authentication
#### You should provide JWT token in \`Authorization: Bearer <jwt_token>\` request header
1. Sign Up (if you haven't done it before) via \`auth/signup\`
2. Login with your \`login\` and \`password\` and get tokens via \`auth/login\`
3. Press \`Authorize\` button and use your \`accessToken\`
    > ![Authorization](https://github.com/EternalRival/nodejs2023Q2-service/assets/59611223/22d81d77-efe9-41cb-9e4e-20358ee9fe4f)
`;
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Home Library Service')
    .setDescription(description)
    .setVersion('1.2.0')
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

  //? remove `true` argument after uncaughtException and unhandledRejection check
  emitUnhandledErrors(3000, true).then((res) => logger.verbose(...res));
}

bootstrap();
