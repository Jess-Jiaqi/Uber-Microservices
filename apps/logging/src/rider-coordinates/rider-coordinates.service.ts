import { Inject, Injectable } from '@nestjs/common';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate } from './schemas/rider-coordinates.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RiderCoordinatesService {
  constructor(
    @InjectModel(RiderCoordinate.name)
    private readonly riderCoordinateModel: Model<RiderCoordinate>,
    @Inject('RIDER_SERVICE') private client: ClientProxy
  ) { }
  async getRiderCoordinates(riderId: string) {
    try {
      console.log(`Finding coordinates for rider: ${riderId}`);
      const coordinates = await this.riderCoordinateModel.find({ rider: riderId });
      console.log(`Found ${coordinates.length} coordinates`);
      
      const pattern = { cmd: 'get-rider' };
      const payload = { id: riderId };
      console.log(`Sending request to rider service with payload:`, payload);
      
      try {
        const rider = await firstValueFrom(this.client.send(pattern, payload));
        console.log(`Received rider data:`, rider);
        return { coordinates, rider };
      } catch (microserviceError) {
        console.error(`Rider service communication error:`, microserviceError);
        // 返回坐标但不返回rider信息，避免整个请求失败
        return { 
          coordinates, 
          rider: null, 
          error: `无法获取骑手信息: ${JSON.stringify(microserviceError)}` 
        };
      }
    } catch (error) {
      console.error(`General error in getRiderCoordinates:`, error);
      throw new Error(`获取骑手坐标失败: ${typeof error === 'object' ? JSON.stringify(error) : error}`);
    }
  }

  async getAllRiderCoordinates() {
    try {
      const coordinates = await this.riderCoordinateModel.find().exec();
      return { coordinates };
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }
  
  async saveRiderCoordinates(createCoordinateDto: CreateCoordinatesDto) {
    return await this.riderCoordinateModel.create(createCoordinateDto);
  }
}
