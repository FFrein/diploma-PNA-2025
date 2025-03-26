import { Module } from '@nestjs/common';
import { VaccinationAnimalService } from './vaccination-animal.service';
import { VaccinationAnimalController } from './vaccination-animal.controller';

@Module({
  controllers: [VaccinationAnimalController],
  providers: [VaccinationAnimalService],
})
export class VaccinationAnimalModule {}
