import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT ?? 3000;
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.enableCors({
      origin: ['http://192.168.1.3:3001', 'http://localhost:3001'],
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    const config = new DocumentBuilder()
      .setTitle('MedCore REST-API')
      .setDescription("The Powered by Og'abek | Shamsiddin ")
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);
    await app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    throw new InternalServerErrorException(err.message);
  }
}
bootstrap();
