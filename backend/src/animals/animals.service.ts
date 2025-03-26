import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindAnimalsQueryDto } from 'src/animal-images/dto/find-animal-query.dto';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AnimalCreateInput) {
    return this.prisma.animal.create({ data });
  }

  async findAll(query: FindAnimalsQueryDto) {
    const {
      name,
      animalType,
      health,
      size,
      color,
      age,
      animalBreedId,
      page = 1,
      pageSize = 10,
    } = query;

    const skip = ((Number(page) || 1) - 1) * Number(pageSize) || 0;
    const take = Number(pageSize) || 10;

    const filter: Prisma.AnimalFindManyArgs = {
      where: {},
      skip,
      take,
      include: {
        animalImages: true,
        vaccinations: true,
      },
    };

    if (name) {
      filter.where = {
        ...filter.where,
        name: { contains: name, mode: 'insensitive' },
      };
    }
    if (animalType) {
      filter.where = { ...filter.where, animalType: animalType };
    }
    if (health) {
      filter.where = { ...filter.where, health: health };
    }
    if (size) {
      filter.where = { ...filter.where, size: size };
    }
    if (color) {
      filter.where = { ...filter.where, color: color };
    }
    if (age) {
      filter.where = { ...filter.where, age: Number(age) };
    }
    if (animalBreedId) {
      filter.where = { ...filter.where, animalBreedId: Number(animalBreedId) };
    }

    const animals = await this.prisma.animal.findMany(filter);

    const totalAnimals = await this.prisma.animal.count({
      where: filter.where,
    });

    const totalPages = Math.ceil(totalAnimals / Number(pageSize) || 10);

    return {
      animals,
      totalPages,
      currentPage: page,
      totalAnimals,
    };
  }

  findOne(id: number) {
    return this.prisma.animal.findFirst({
      where: { id: Number(id) },
      include: {
        animalImages: true,
        animalBreed: true,
        vaccinations: {
          include: {
            vaccination: true,
          },
        },
      },
    });
  }

  update(id: number, data: Prisma.AnimalUpdateInput) {
    return this.prisma.animal.update({ where: { id: id }, data });
  }

  async remove(id: number) {
    await this.prisma.animalImage.deleteMany({
      where: { animalId: id },
    });
    return this.prisma.animal.delete({ where: { id: id } });
  }
}
