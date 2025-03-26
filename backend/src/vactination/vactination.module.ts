import { Module } from '@nestjs/common';
import { VactinationService } from './vactination.service';
import { VactinationController } from './vactination.controller';

@Module({
  controllers: [VactinationController],
  providers: [VactinationService],
})
export class VactinationModule {}
