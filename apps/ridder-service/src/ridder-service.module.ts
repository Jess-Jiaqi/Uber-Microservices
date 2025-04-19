import { Module } from '@nestjs/common';
import { RidderServiceController } from './ridder-service.controller';
import { RidderServiceService } from './ridder-service.service';

@Module({
  imports: [],
  controllers: [RidderServiceController],
  providers: [RidderServiceService],
})
export class RidderServiceModule {}
