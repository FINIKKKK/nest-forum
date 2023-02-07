import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './utils/validation/validation.pipe';

async function start() {
  const port = process.env.PORT || 7777;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log(`Server starting in port: ${port}`));
}
start();
