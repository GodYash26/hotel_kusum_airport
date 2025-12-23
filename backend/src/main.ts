import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const PORT = process.env.PORT || 3000;

const AllowOrigin = [ "http://localhost:3000", "https://hotel-booking-app-frontend.vercel.app"]

  app.enableCors({
    origin: AllowOrigin,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: 'Content-Length, X-Content-Type-Options',
    allowedHeaders: 'Content-Type, Authorization',
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });


    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const firstError = errors[0];

        // Make sure constraints exist
        const constraints = firstError?.constraints;
        if (!constraints) {
          return new BadRequestException('Validation failed');
        }

        const firstConstraint = Object.values(constraints)[0];
        return new BadRequestException(firstConstraint);
      },
    }),
  );  

  const configswagger = new DocumentBuilder()
    .setTitle('Hotel Booking API')
    .setDescription('Hotel Booking API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configswagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`Application is running on: http://localhost:${PORT}`);
  });
}
bootstrap();
