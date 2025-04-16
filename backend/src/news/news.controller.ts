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
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { sendNewsNotification } from 'src/bot/bot';
import FileService from 'src/utils/file.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fs = new FileService();
    const imageUrl = await fs.uploadFile(file);

    await sendNewsNotification({
      imageUrl: imageUrl,
      link: 'https://www.youtube.com/watch?v=Onn38VeEAC8&t=2s', //process.env.SITE_URL || 'http://localhost:5173/animal/' + animal.id,
      text: 'Новости!',
    });

    return this.newsService.create({ ...createNewsDto, iamge: imageUrl });
  }

  @Get()
  findAll(@Query('page') page: string, @Query('pageSize') pageSize: string) {
    return this.newsService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFile() iamge: Express.Multer.File,
  ) {
    let data = updateNewsDto as any;
    if (iamge) {
      const fs = new FileService();
      const imageUrl = await fs.uploadFile(iamge);

      data.iamge = imageUrl;
    }

    return this.newsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
