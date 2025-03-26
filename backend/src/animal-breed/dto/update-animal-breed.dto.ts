import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalBreedDto } from './create-animal-breed.dto';

export class UpdateAnimalBreedDto extends PartialType(CreateAnimalBreedDto) {}
