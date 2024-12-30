import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Добавим глобальный пайплайн валидации на следующей строке
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Апка стартанула на порту ${port}`);
}
bootstrap();
