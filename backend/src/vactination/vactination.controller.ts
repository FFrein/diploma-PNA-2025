import { Controller, Get } from '@nestjs/common';
import { VactinationService } from './vactination.service';

@Controller('vactination')
export class VactinationController {
  constructor(private readonly vactinationService: VactinationService) {}

  @Get()
  findAll() {
    return this.vactinationService.findAll();
  }

  /*
  @Post()
  create(@Body() createVactinationDto: CreateVactinationDto) {
    return this.vactinationService.create(createVactinationDto);
  }

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

  @Delete(':id')
  remove(
    @Param('animalId') animalId: string,
    @Param('vactinationId') id: string,
  ) {
    return this.vactinationService.remove(+id);
  }
  */
}
