import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimalBreedService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.animalBreed.findMany({});
  }

  /*
  create(createAnimalBreedDto: CreateAnimalBreedDto) {
    return 'This action adds a new animalBreed';
  }

  findOne(id: number) {
    return `This action returns a #${id} animalBreed`;
  }

  update(id: number, updateAnimalBreedDto: UpdateAnimalBreedDto) {
    return `This action updates a #${id} animalBreed`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalBreed`;
  }
  */
}
