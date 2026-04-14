import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT ?? 3000;
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.listen(PORT, () =>
      console.log(`Server is running on http://127.0.0.1:${PORT}`),
    );
  } catch (err) {
    throw new InternalServerErrorException(err.message);
  }
}
bootstrap();
