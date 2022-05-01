import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector)
  const configService = app.get(ConfigService);
  const apiVersion = configService.get<string>('API_VERSION');
  const PORT = +configService.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.setGlobalPrefix(apiVersion)
  await app.listen(PORT);
}

bootstrap();
