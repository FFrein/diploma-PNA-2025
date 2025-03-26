import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoodsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.GoodsCreateInput) {
    return this.prisma.goods.create({ data });
  }

  findAll() {
    return this.prisma.goods.findMany({});
  }

  findOne(id: number) {
    return this.prisma.goods.findFirst({ where: { id: id } });
  }

  update(id: number, data: Prisma.GoodsUpdateInput) {
    return this.prisma.goods.update({ where: { id: id }, data });
  }

  remove(id: number) {
    return this.prisma.goods.delete({ where: { id: id } });
  }
}
