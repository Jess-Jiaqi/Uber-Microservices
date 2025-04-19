import { Controller, Get } from '@nestjs/common';
import { RidderServiceService } from './ridder-service.service';

@Controller()
export class RidderServiceController {
  constructor(private readonly ridderServiceService: RidderServiceService) {}

  @Get()
  getHello(): string {
    return this.ridderServiceService.getHello();
  }
}
