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
      const coordinates = await this.riderCoordinateModel.find({ rider: riderId });
      const pattern = { cmd: 'get-rider' };
      const payload = { id: riderId };
      const rider = await firstValueFrom(this.client.send(pattern, payload))
      return { coordinates, rider };
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }
  async saveRiderCoordinates(createCoordinateDto: CreateCoordinatesDto) {
    return await this.riderCoordinateModel.create(createCoordinateDto);
  }
}
