import { NestFactory } from '@nestjs/core';
import { RidderServiceModule } from './ridder-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RidderServiceModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
