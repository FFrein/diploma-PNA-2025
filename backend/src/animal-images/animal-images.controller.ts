import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { AnimalImagesService } from './animal-images.service';
import { CreateAnimalImageDto } from './dto/create-animal-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import FileService from 'src/utils/file.service';
import { AnimalsService } from 'src/animals/animals.service';

@Controller('animals-images')
export class AnimalsImagesController {
  constructor(
    private readonly animalImagesService: AnimalImagesService,
    private readonly animalsService: AnimalsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createAnimalImageDto: CreateAnimalImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const animal = await this.animalsService.findOne(
      Number(createAnimalImageDto.animal),
    );

    if (!animal) {
      throw new NotFoundException(
        `Животное с ID ${createAnimalImageDto.animal} не найдено`,
      );
    }

    const fs = new FileService();
    const imageUrl = await fs.uploadFile(file);

    return await this.animalImagesService.create({
      animal: { connect: { id: Number(createAnimalImageDto.animal) } },
      imageUrl: imageUrl,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalImagesService.findByAnimalId(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalImagesService.remove(+id);
  }
}
