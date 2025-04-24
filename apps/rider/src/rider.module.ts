import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';
import { Rider } from './entities/rider.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'uber',
      entities: [Rider],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Rider]),
  ],
  controllers: [RiderController],
  providers: [RiderService],
})
export class RiderModule {}
