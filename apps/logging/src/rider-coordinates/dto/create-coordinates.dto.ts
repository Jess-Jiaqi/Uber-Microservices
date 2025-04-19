import { IsNumber,IsNotEmpty, IsString } from "class-validator";

export class CreateCoordinatesDto {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  rider: string;
}
