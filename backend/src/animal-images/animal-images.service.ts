import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnimalImagesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AnimalImageCreateInput) {
    return this.prisma.animalImage.create({ data });
  }

  findByAnimalId(id: number) {
    return this.prisma.animalImage.findMany({ where: { animalId: id } });
  }

  remove(id: number) {
    return this.prisma.animalImage.delete({ where: { id: id } });
  }
}
