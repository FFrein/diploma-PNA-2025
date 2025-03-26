import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationAnimalController } from './vaccination-animal.controller';
import { VaccinationAnimalService } from './vaccination-animal.service';

describe('VaccinationAnimalController', () => {
  let controller: VaccinationAnimalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationAnimalController],
      providers: [VaccinationAnimalService],
    }).compile();

    controller = module.get<VaccinationAnimalController>(VaccinationAnimalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
