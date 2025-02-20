import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { TskvLogger } from './logger/tskv.logger';
import { JsonLogger } from './logger/json.logger';
import { DevLogger } from './logger/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  // Добавим глобальный пайплайн валидации на следующей строке
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER_TYPE || 'dev';

  switch (loggerType) {
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'dev':
      app.useLogger(new DevLogger());
      break;
  }

  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Апка стартанула на порту ${port}`);
}
bootstrap();
