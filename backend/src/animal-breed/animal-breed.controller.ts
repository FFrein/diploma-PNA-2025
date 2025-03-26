import { Controller, Get } from '@nestjs/common';
import { AnimalBreedService } from './animal-breed.service';

@Controller('animal-breed')
export class AnimalBreedController {
  constructor(private readonly animalBreedService: AnimalBreedService) {}

  @Get()
  findAll() {
    return this.animalBreedService.findAll();
  }

  /*
  @Post()
  create(@Body() createAnimalBreedDto: CreateAnimalBreedDto) {
    return this.animalBreedService.create(createAnimalBreedDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalBreedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnimalBreedDto: UpdateAnimalBreedDto,
  ) {
    return this.animalBreedService.update(+id, updateAnimalBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalBreedService.remove(+id);
  }
  */
}
