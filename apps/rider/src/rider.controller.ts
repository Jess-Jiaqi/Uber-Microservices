import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { RiderService } from './rider.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignupDto, LoginDto } from './dto/rider.dto';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post('signup')
  async httpSignup(@Body() signupDto: SignupDto) {
    return this.riderService.signup(signupDto);
  }

  @Post('login')
  async httpLogin(@Body() loginDto: LoginDto) {
    return this.riderService.login(loginDto);
  }

  @Get(':id')
  async httpGetRiderById(@Param('id') id: string) {
    return this.riderService.getRiderById(id);
  }

  
  @MessagePattern({ cmd: 'signup-rider' })
  async signup(@Payload() signupDto: SignupDto) {
    return this.riderService.signup(signupDto);
  }

  @MessagePattern({ cmd: 'login-rider' })
  async login(@Payload() loginDto: LoginDto) {
    return this.riderService.login(loginDto);
  }

  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(data: any) {
    console.log(data);
    return this.riderService.getRiderById(data.id);
  }
}
