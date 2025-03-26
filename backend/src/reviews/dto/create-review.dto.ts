import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rating: number;
  @IsString()
  description: string;
  @IsNumber()
  user: number;
}
