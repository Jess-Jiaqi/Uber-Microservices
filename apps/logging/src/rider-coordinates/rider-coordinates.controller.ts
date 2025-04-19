import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { RiderCoordinatesService } from './rider-coordinates.service';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
  constructor(private coordinatesService: RiderCoordinatesService) {}
  @Get(':id')
  async getRiderCoordinates(
    @Param()
    params: any,
  ) {
    return this.coordinatesService.getRiderCoordinates(params.id);
  }

  @Post()
  async saveRiderCoordinates(
    @Body()
    createCoordinateDto: CreateCoordinatesDto,
  ) {
    return this.coordinatesService.saveRiderCoordinates(createCoordinateDto);
  }
}
