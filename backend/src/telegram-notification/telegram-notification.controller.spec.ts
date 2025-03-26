import { Test, TestingModule } from '@nestjs/testing';
import { TelegramNotificationController } from './telegram-notification.controller';
import { TelegramNotificationService } from './telegram-notification.service';

describe('TelegramNotificationController', () => {
  let controller: TelegramNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramNotificationController],
      providers: [TelegramNotificationService],
    }).compile();

    controller = module.get<TelegramNotificationController>(TelegramNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
