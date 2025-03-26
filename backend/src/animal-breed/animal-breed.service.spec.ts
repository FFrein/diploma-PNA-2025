import { Test, TestingModule } from '@nestjs/testing';
import { AnimalBreedService } from './animal-breed.service';

describe('AnimalBreedService', () => {
  let service: AnimalBreedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalBreedService],
    }).compile();

    service = module.get<AnimalBreedService>(AnimalBreedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
