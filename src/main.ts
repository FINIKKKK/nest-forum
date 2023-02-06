import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const port = process.env.PORT || 7777;

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(port, () => console.log(`Server starting in port: ${port}`));
}
start();
