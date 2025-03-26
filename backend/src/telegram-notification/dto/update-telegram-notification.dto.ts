import { PartialType } from '@nestjs/mapped-types';
import { CreateTelegramNotificationDto } from './create-telegram-notification.dto';

export class UpdateTelegramNotificationDto extends PartialType(CreateTelegramNotificationDto) {}
