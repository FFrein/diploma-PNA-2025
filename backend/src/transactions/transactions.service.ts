import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TransactionsCreateInput) {
    return this.prisma.transactions.create({ data });
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [transactions, total] = await Promise.all([
      this.prisma.transactions.findMany({
        skip,
        take,
      }),
      this.prisma.transactions.count(),
    ]);

    return {
      transactions,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
