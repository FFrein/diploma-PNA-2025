import { Test, TestingModule } from '@nestjs/testing';
import { TelegramNotificationService } from './telegram-notification.service';

describe('TelegramNotificationService', () => {
  let service: TelegramNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramNotificationService],
    }).compile();

    service = module.get<TelegramNotificationService>(TelegramNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
