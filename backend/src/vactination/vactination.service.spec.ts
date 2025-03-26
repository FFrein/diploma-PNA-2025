import { Test, TestingModule } from '@nestjs/testing';
import { VactinationService } from './vactination.service';

describe('VactinationService', () => {
  let service: VactinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VactinationService],
    }).compile();

    service = module.get<VactinationService>(VactinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
