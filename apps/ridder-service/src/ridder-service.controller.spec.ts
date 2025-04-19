import { Test, TestingModule } from '@nestjs/testing';
import { RidderServiceController } from './ridder-service.controller';
import { RidderServiceService } from './ridder-service.service';

describe('RidderServiceController', () => {
  let ridderServiceController: RidderServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RidderServiceController],
      providers: [RidderServiceService],
    }).compile();

    ridderServiceController = app.get<RidderServiceController>(RidderServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ridderServiceController.getHello()).toBe('Hello World!');
    });
  });
});
