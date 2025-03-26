import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({
    description: 'Изображение животного',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  file?: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Время прививки от бешенства',
    description: 'Заголовок новостей',
  })
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'В осенний период животные часто могут заболеть...',
    description: 'Текст новостей',
  })
  description: string;
}
