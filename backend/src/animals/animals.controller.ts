import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FindAnimalsQueryDto } from 'src/animal-images/dto/find-animal-query.dto';
import FileService from '../utils/file.service.js';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiConsumes } from '@nestjs/swagger';
import { AnimalImagesService } from 'src/animal-images/animal-images.service';
import { sendAnimalNotification } from '../bot/bot';

@Controller('animals')
export class AnimalsController {
  constructor(
    private readonly animalsService: AnimalsService,
    private readonly animalImagesService: AnimalImagesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fs = new FileService();
    const imageUrl = await fs.uploadFile(file);
    const animal = await this.animalsService.create({
      animalBreed: { connect: { id: Number(createAnimalDto.animalBreed) } },
      name: createAnimalDto.name,
      animalType: createAnimalDto.animalType,
      health: createAnimalDto.health,
      age: Number(createAnimalDto.age) || 0,
      size: createAnimalDto.size,
      color: createAnimalDto.color,
      foodPerDay: Number(createAnimalDto.foodPerDay) || 0,
      toiletPerDay: Number(createAnimalDto.toiletPerDay) || 0,
      description: createAnimalDto.description,
      sterilized: createAnimalDto.sterilized === '0' ? false : true,
      status: 'new',
      gender: createAnimalDto.gender,
    });

    const animalImage = await this.animalImagesService.create({
      animal: { connect: { id: animal.id } },
      imageUrl: imageUrl,
    });

    await sendAnimalNotification({
      imageUrl: imageUrl,
      link: 'https://www.youtube.com/watch?v=Onn38VeEAC8&t=2s', //process.env.SITE_URL || 'http://localhost:5173/animal/' + animal.id,
      text: 'Привет! Вот тебе интересное предложение!',
    });

    return animal;
  }

  @Get()
  findAll(@Query() query: FindAnimalsQueryDto) {
    return this.animalsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, {
      animalBreed: { connect: { id: Number(updateAnimalDto.animalBreed) } },
      name: updateAnimalDto.name,
      animalType: updateAnimalDto.animalType,
      health: updateAnimalDto.health,
      age: Number(updateAnimalDto.age) || 0,
      size: updateAnimalDto.size,
      color: updateAnimalDto.color,
      foodPerDay: Number(updateAnimalDto.foodPerDay) || 0,
      toiletPerDay: Number(updateAnimalDto.toiletPerDay) || 0,
      description: updateAnimalDto.description,
      sterilized: updateAnimalDto.sterilized === '0' ? false : true,
      status: updateAnimalDto.status,
      gender: updateAnimalDto.gender,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
