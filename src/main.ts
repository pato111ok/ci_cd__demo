import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
// const moment = require('moment-timezone');

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const logger = new Logger();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // moment().tz('America/Bogota').format();
  // moment.tz.setDefault('America/Bogota');

  await app.listen(4000);
  logger.log('server in port 4000 Flor del valle');
}
bootstrap();
