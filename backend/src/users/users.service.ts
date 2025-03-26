import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from '../entities/User';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id: id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email: email } });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.findOne(id);

    if (!user) {
      throw new UnauthorizedException('Пользователь с таким id не найден');
    }

    return await this.prisma.user.update({ where: { id: user.id }, data });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
