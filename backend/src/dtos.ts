import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class baseQuery {
  @ApiProperty({ description: 'Номер страницы', required: false, default: 1 })
  @IsOptional()
  @IsString()
  page?: string = '1';

  @ApiProperty({ description: 'Размер страницы', required: false, default: 10 })
  @IsOptional()
  @IsString()
  pageSize?: string = '10';
}
