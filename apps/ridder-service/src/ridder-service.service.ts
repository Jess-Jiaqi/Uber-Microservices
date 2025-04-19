import { Injectable } from '@nestjs/common';

@Injectable()
export class RidderServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
