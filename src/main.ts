import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //creating app
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true //use to make validation pipe to remove extra details given in dto from body
  }))
  await app.listen(3000);
}
bootstrap();
