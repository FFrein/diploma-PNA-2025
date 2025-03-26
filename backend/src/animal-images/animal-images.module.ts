import { Module } from '@nestjs/common';
import { AnimalImagesService } from './animal-images.service';
import { AnimalsService } from 'src/animals/animals.service';
import { AnimalsImagesController } from './animal-images.controller';

@Module({
  controllers: [AnimalsImagesController],
  providers: [AnimalImagesService, AnimalsService],
})
export class AnimalImagesModule {}
