import { IsString } from 'class-validator';

export class CreateAnimalImageDto {
  @IsString()
  animal: string;
}
