import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VactinationService } from './vactination.service';
import { CreateVactinationDto } from './dto/create-vactination.dto';
import { $Enums } from '@prisma/client';

@Controller('vactination')
export class VactinationController {
  constructor(private readonly vactinationService: VactinationService) {}

  @Get()
  findAll() {
    return this.vactinationService.findAll();
  }

  @Post()
  create(@Body() createVactinationDto: CreateVactinationDto) {
    if (
      Object.keys($Enums.animalType).includes(createVactinationDto.animalType)
    ) {
      return this.vactinationService.create({
        name: createVactinationDto.name,
        description: createVactinationDto.description,
        animalType: $Enums.animalType[createVactinationDto.animalType],
      });
    } else {
      throw new Error('animal type incorrect');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vactinationService.remove(+id);
  }
  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vactinationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVactinationDto: UpdateVactinationDto,
  ) {
    return this.vactinationService.update(+id, updateVactinationDto);
  }
  */
}
