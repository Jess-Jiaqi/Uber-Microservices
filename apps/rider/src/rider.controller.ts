import { Controller, Body } from '@nestjs/common';
import { RiderService } from './rider.service';
import { MessagePattern } from '@nestjs/microservices';
import { SignupDto, LoginDto } from './dto/rider.dto';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @MessagePattern({ cmd: 'signup-rider' })
  async signup(@Body() signupDto: SignupDto) {
    return this.riderService.signup(signupDto);
  }

  @MessagePattern({ cmd: 'login-rider' })
  async login(@Body() loginDto: LoginDto) {
    return this.riderService.login(loginDto);
  }

  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(data: any) {
    console.log(data);
    return this.riderService.getRiderById(data.id);
  }
}
