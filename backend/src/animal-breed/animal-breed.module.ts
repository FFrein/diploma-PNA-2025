import { Module } from '@nestjs/common';
import { AnimalBreedService } from './animal-breed.service';
import { AnimalBreedController } from './animal-breed.controller';

@Module({
  controllers: [AnimalBreedController],
  providers: [AnimalBreedService],
})
export class AnimalBreedModule {}
