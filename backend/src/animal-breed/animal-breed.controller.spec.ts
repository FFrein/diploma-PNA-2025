import { Test, TestingModule } from '@nestjs/testing';
import { AnimalBreedController } from './animal-breed.controller';
import { AnimalBreedService } from './animal-breed.service';

describe('AnimalBreedController', () => {
  let controller: AnimalBreedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalBreedController],
      providers: [AnimalBreedService],
    }).compile();

    controller = module.get<AnimalBreedController>(AnimalBreedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
