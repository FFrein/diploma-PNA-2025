import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { VaccinationAnimalService } from './vaccination-animal.service';
import { CreateVaccinationAnimalDto } from './dto/create-vaccination-animal.dto';

@Controller('vaccination-animal')
export class VaccinationAnimalController {
  constructor(
    private readonly vaccinationAnimalService: VaccinationAnimalService,
  ) {}

  @Post()
  async create(@Body() createVaccinationAnimalDto: CreateVaccinationAnimalDto) {
    const exist = await this.vaccinationAnimalService.exist(
      createVaccinationAnimalDto.animal,
      createVaccinationAnimalDto.vaccination,
    );

    if (exist) {
      throw new BadRequestException('Запись уже существует');
    }

    return this.vaccinationAnimalService.create({
      animal: { connect: { id: createVaccinationAnimalDto.animal } },
      vaccination: { connect: { id: createVaccinationAnimalDto.vaccination } },
    });
  }

  @Delete(':aminalId/:vaccinationId')
  remove(
    @Param('aminalId') aminalId: string,
    @Param('vaccinationId') vaccinationId: string,
  ) {
    return this.vaccinationAnimalService.remove(+aminalId, +vaccinationId);
  }

  /*
  @Get()
  findAll() {
    return this.vaccinationAnimalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationAnimalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccinationAnimalDto: UpdateVaccinationAnimalDto,
  ) {
    return this.vaccinationAnimalService.update(
      +id,
      updateVaccinationAnimalDto,
    );
  }

  */
}
