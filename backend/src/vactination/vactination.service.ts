import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
//import { Prisma } from '@prisma/client';

@Injectable()
export class VactinationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.vaccination.findMany({});
  }

  create(data: Prisma.VaccinationCreateInput) {
    return this.prisma.vaccination.create({ data });
  }

  remove(id: number) {
    return this.prisma.vaccination.delete({ where: { id: id } });
  }

  /*
  findOne(id: number) {
    return `This action returns a #${id} vactination`;
  }

  update(id: number, data: Prisma.VaccinationUpdateInput) {
    return `This action updates a #${id} vactination`;
  }
  */
}
