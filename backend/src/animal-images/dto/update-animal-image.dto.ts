import { PartialType } from '@nestjs/swagger';
import { CreateAnimalImageDto } from './create-animal-image.dto';

export class UpdateAnimalImageDto extends PartialType(CreateAnimalImageDto) {}
