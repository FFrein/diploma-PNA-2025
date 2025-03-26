import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { Prisma } from '@prisma/client';

@Injectable()
export class VactinationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.vaccination.findMany({});
  }

  /*
  create(data: Prisma.VaccinationCreateInput) {
    return this.prisma.animal.create({ data });
  }

  findOne(id: number) {
    return `This action returns a #${id} vactination`;
  }

  update(id: number, data: Prisma.VaccinationUpdateInput) {
    return `This action updates a #${id} vactination`;
  }

  remove(id: number) {
    return `This action removes a #${id} vactination`;
  }
  */
}
