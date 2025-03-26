import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { status } from '@prisma/client';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
  @IsEnum(status)
  @IsOptional()
  @ApiProperty({
    example: 'new',
    description: 'Статус животного',
    enum: status,
  })
  status: status;
}
