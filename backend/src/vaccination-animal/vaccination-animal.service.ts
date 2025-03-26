import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VaccinationAnimalService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.VaccinationAnimalCreateInput) {
    return this.prisma.vaccinationAnimal.create({ data });
  }

  remove(animalId: number, vaccinationId: number) {
    return this.prisma.vaccinationAnimal.deleteMany({
      where: {
        animalId: animalId,
        vaccinationId: vaccinationId,
      },
    });
  }

  exist(animalId: number, vaccinationId: number) {
    return this.prisma.vaccinationAnimal.findFirst({
      where: {
        animalId: animalId,
        vaccinationId: vaccinationId,
      },
    });
  }
  /*
  findAll() {
    return this.prisma.animal.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccinationAnimal`;
  }

  update(id: number, data: Prisma.VaccinationAnimalUpdateInput) {
    return `This action updates a #${id} vaccinationAnimal`;
  }
  */
}
