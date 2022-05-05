import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app';
import { AllExceptionsFilter } from './common/exceptions/exception-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const apiVersion = configService.get<string>('API_VERSION');
  const PORT = +configService.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix(apiVersion);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Vank documentation')
    .setDescription('The Vank API description')
    .setVersion('1.0')
    .build();

  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}

bootstrap();
