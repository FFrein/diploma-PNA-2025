import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput) {
    return this.prisma.review.create({ data });
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [reviews, totalReviews] = await Promise.all([
      this.prisma.review.findMany({
        skip,
        take,
        include: { user: true },
      }),
      this.prisma.review.count(),
    ]);

    return {
      reviews,
      totalReviews,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalReviews / pageSize),
    };
  }

  findOne(id: number) {
    return this.prisma.review.findFirst({ where: { userId: id } });
  }

  update(id: number, data: Prisma.ReviewUpdateInput) {
    return this.prisma.review.update({ where: { id: id }, data });
  }

  remove(id: number) {
    return this.prisma.review.delete({ where: { id: id } });
  }
}
