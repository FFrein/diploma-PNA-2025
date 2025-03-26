import { PartialType } from '@nestjs/mapped-types';
import { CreateVactinationDto } from './create-vactination.dto';

export class UpdateVactinationDto extends PartialType(CreateVactinationDto) {}
