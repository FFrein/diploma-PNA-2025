import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVactinationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Название прививки',
    description: 'Прививка 1',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Описание прививки',
    description: 'Прививка от глистов',
  })
  description: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Тип животного',
    description: 'Собака / Кот',
  })
  animalType: string;
}
