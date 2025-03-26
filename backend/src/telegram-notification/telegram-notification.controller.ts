import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TelegramNotificationService } from './telegram-notification.service';
import { CreateTelegramNotificationDto } from './dto/create-telegram-notification.dto';

@Controller('telegram-notification')
export class TelegramNotificationController {
  constructor(
    private readonly telegramNotificationService: TelegramNotificationService,
  ) {}

  @Post()
  create(@Body() createTelegramNotificationDto: CreateTelegramNotificationDto) {
    return this.telegramNotificationService.create(
      createTelegramNotificationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.telegramNotificationService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telegramNotificationService.remove(+id);
  }
}
