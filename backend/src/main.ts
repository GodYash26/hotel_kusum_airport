
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bodyParser: true,
  });

  const configService = app.get(ConfigService);
  app.use(cookieParser());
  const ALLOWED_ORIGIN = ['http://localhost:3000', 'http://localhost:4000'];

  app.enableCors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  const configSwagger = new DocumentBuilder()
    .setTitle('Hotel Booking backend API')
    .setDescription(
      'API documentation for the Hotel Booking backend system',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  const PORT = configService.get<number>('PORT') ?? 4001;
  await app.listen(PORT, '0.0.0.0');
  console.log(` API running on http://localhost:${PORT}/api`);
}
bootstrap();
