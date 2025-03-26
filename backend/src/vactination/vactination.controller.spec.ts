import { Test, TestingModule } from '@nestjs/testing';
import { VactinationController } from './vactination.controller';
import { VactinationService } from './vactination.service';

describe('VactinationController', () => {
  let controller: VactinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VactinationController],
      providers: [VactinationService],
    }).compile();

    controller = module.get<VactinationController>(VactinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
