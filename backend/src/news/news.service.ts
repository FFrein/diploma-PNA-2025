import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.NewsCreateInput) {
    return this.prisma.news.create({ data });
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [news, totalNews] = await Promise.all([
      this.prisma.news.findMany({
        skip,
        take,
      }),
      this.prisma.news.count(),
    ]);
    //asd
    return {
      news,
      totalNews,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalNews / pageSize),
    };
  }

  findOne(id: number) {
    return this.prisma.news.findFirst({ where: { id: id } });
  }

  update(id: number, data: Prisma.NewsUpdateInput) {
    return this.prisma.news.update({ where: { id: id }, data });
  }

  remove(id: number) {
    return this.prisma.news.delete({ where: { id: id } });
  }
}
