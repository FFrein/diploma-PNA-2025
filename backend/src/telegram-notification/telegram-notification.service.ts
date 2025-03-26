import { Injectable } from '@nestjs/common';
import { CreateTelegramNotificationDto } from './dto/create-telegram-notification.dto';
import { UpdateTelegramNotificationDto } from './dto/update-telegram-notification.dto';

@Injectable()
export class TelegramNotificationService {
  create(createTelegramNotificationDto: CreateTelegramNotificationDto) {
    return 'This action adds a new telegramNotification';
  }

  findOne(id: number) {
    return `This action returns a #${id} telegramNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} telegramNotification`;
  }
}
