import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationAnimalService } from './vaccination-animal.service';

describe('VaccinationAnimalService', () => {
  let service: VaccinationAnimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationAnimalService],
    }).compile();

    service = module.get<VaccinationAnimalService>(VaccinationAnimalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
