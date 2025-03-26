import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { AnimalImagesService } from 'src/animal-images/animal-images.service';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalImagesService],
})
export class AnimalsModule {}
