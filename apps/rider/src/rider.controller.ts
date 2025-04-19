import { Controller, Get, Param } from '@nestjs/common';
import { RiderService } from './rider.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  // @Get(':id')
  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(
    data: any
  ) {
    console.log(data)
    return Promise.resolve({
      _id: data.id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
  }
}
