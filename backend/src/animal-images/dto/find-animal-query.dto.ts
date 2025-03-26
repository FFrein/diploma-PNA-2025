import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsInt,
  IsString,
  IsPositive,
} from 'class-validator';
import { animalType, health, size, color } from '@prisma/client'; // Импортируем типы из Prisma

export class FindAnimalsQueryDto {
  @ApiProperty({ description: 'Название животного', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    enum: animalType,
    description: 'Тип животного (собака или кошка)',
    required: false,
  })
  @IsOptional()
  @IsEnum(animalType)
  animalType?: animalType;

  @ApiProperty({
    enum: health,
    description: 'Здоровье животного',
    required: false,
  })
  @IsOptional()
  @IsEnum(health)
  health?: health;

  @ApiProperty({ enum: size, description: 'Размер животного', required: false })
  @IsOptional()
  @IsEnum(size)
  size?: size;

  @ApiProperty({ enum: color, description: 'Цвет животного', required: false })
  @IsOptional()
  @IsEnum(color)
  color?: color;

  @ApiProperty({ description: 'Возраст животного', required: false })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiProperty({ description: 'ID породы животного', required: false })
  @IsOptional()
  @IsString()
  animalBreedId?: string;

  @ApiProperty({ description: 'Номер страницы', required: false, default: 1 })
  @IsOptional()
  @IsString()
  page?: string = '1';

  @ApiProperty({ description: 'Размер страницы', required: false, default: 10 })
  @IsOptional()
  @IsString()
  pageSize?: string = '10';
}
