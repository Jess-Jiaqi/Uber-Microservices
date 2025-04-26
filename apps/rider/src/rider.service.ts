import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './entities/rider.entity';
import { SignupDto, LoginDto, RiderDto } from './dto/rider.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
  ) {}

  async signup(signupDto: SignupDto): Promise<RiderDto> {
    const { email, password } = signupDto;
    
    // Check if rider already exists
    const existingRider = await this.riderRepository.findOne({ where: { email } });
    if (existingRider) {
      throw new ConflictException('Email already exists');
    }
    
    // 手动设置一个固定的ID（开发阶段使用）
    const riderId = 'rider_' + Date.now(); // 使用时间戳确保唯一性
    
    // 检查ID是否已存在
    const existingId = await this.riderRepository.findOne({ where: { id: riderId } });
    if (existingId) {
      throw new ConflictException('ID already exists');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new rider with manual ID
    const rider = this.riderRepository.create({
      id: riderId,
      ...signupDto,
      password: hashedPassword,
    });
    
    const savedRider = await this.riderRepository.save(rider);
    
    // Return rider without password
    const { password: _, ...riderDto } = savedRider;
    return riderDto as RiderDto;
  }
  
  async login(loginDto: LoginDto): Promise<{ token: string, rider: RiderDto }> {
    const { email, password } = loginDto;
    
    // Find rider by email
    const rider = await this.riderRepository.findOne({ where: { email } });
    if (!rider) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, rider.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Return rider without password
    const { password: _, ...riderDto } = rider;
    
    // In a real application, you would generate a JWT token here
    // For simplicity, we're just returning a mock token
    return {
      token: 'mock-jwt-token',
      rider: riderDto as RiderDto,
    };
  }
  
  async getRiderById(id: string): Promise<RiderDto> {
    const rider = await this.riderRepository.findOne({ where: { id } });
    
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    
    // Return rider without password
    const { password, ...riderDto } = rider;
    return riderDto as RiderDto;
  }
}
