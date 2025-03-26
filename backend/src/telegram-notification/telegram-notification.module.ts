import { Module } from '@nestjs/common';
import { TelegramNotificationService } from './telegram-notification.service';
import { TelegramNotificationController } from './telegram-notification.controller';

@Module({
  controllers: [TelegramNotificationController],
  providers: [TelegramNotificationService],
})
export class TelegramNotificationModule {}
