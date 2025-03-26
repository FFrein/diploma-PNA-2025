import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccinationAnimalDto } from './create-vaccination-animal.dto';

export class UpdateVaccinationAnimalDto extends PartialType(CreateVaccinationAnimalDto) {}
