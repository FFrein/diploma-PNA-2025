import { animalType, color, health, size, gender } from '@prisma/client';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Барсик',
    description: 'Имя животного',
  })
  name: string;

  @IsEnum(gender)
  @IsNotEmpty()
  @ApiProperty({
    example: 'male',
    description: 'пол животного',
  })
  gender: gender;

  @IsEnum(animalType)
  @IsNotEmpty()
  @ApiProperty({
    example: 'cat',
    description: 'Тип животного (cat или dog)',
    enum: animalType,
  })
  animalType: animalType;

  @IsEnum(health)
  @IsNotEmpty()
  @ApiProperty({
    example: 'healthy',
    description: 'Состояние здоровья животного',
    enum: health,
  })
  health: health;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Легкая простуда',
    description: 'Описание заболеваний (если есть)',
    nullable: true,
  })
  diseasesDescription?: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 3,
    description: 'Возраст животного в годах',
  })
  age: number;

  @IsEnum(size)
  @IsNotEmpty()
  @ApiProperty({
    example: 'medium',
    description: 'Размер животного (small, medium, large)',
    enum: size,
  })
  size: size;

  @IsEnum(color)
  @IsNotEmpty()
  @ApiProperty({
    example: 'black',
    description: 'Окрас животного',
    enum: color,
  })
  color: color;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 200,
    description: 'Количество еды в граммах в день',
  })
  foodPerDay: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
    description: 'Количество посещений туалета в день',
  })
  toiletPerDay: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ласковый и дружелюбный котенок.',
    description: 'Описание животного',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'Стерилизовано ли животное',
  })
  sterilized: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID породы животного',
  })
  animalBreed: string;

  @ApiProperty({
    description: 'Изображение животного',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  file?: Express.Multer.File;
}
