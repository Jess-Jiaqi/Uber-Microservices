import { NestFactory } from '@nestjs/core';
import { RiderModule } from './rider.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RiderModule);

  // 配置微服务
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  console.log('Rider microservice is running');
  
  await app.listen(3001);
  console.log('Rider HTTP server is running on port 3001');
}
bootstrap();
