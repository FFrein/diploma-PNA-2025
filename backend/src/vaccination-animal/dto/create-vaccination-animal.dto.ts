import { IsNumber } from 'class-validator';

export class CreateVaccinationAnimalDto {
  @IsNumber()
  animal: number;
  @IsNumber()
  vaccination: number;
}
