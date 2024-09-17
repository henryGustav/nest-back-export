import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  // Allow only this origin (adjust as needed)
    methods: 'GET,POST',  // Allow only specific HTTP methods
    credentials: true,  // Enable sending cookies or authentication headers
  });
  await app.listen(3000);
}
bootstrap();
