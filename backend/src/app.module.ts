import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AnimalsModule } from './animals/animals.module';
import { ReviewsModule } from './reviews/reviews.module';
import { GoodsModule } from './goods/goods.module';
import { AuthModule } from './guards/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { VactinationService } from './vactination/vactination.service';
import { TelegramNotificationModule } from './telegram-notification/telegram-notification.module';
import { AnimalBreedModule } from './animal-breed/animal-breed.module';
import { VaccinationAnimalModule } from './vaccination-animal/vaccination-animal.module';
import { VactinationModule } from './vactination/vactination.module';
import { AnimalImagesModule } from './animal-images/animal-images.module';
import { NewsModule } from './news/news.module';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    UsersModule,
    AnimalsModule,
    ReviewsModule,
    GoodsModule,
    AuthModule,
    PrismaModule,
    VactinationModule,
    VaccinationAnimalModule,
    AnimalBreedModule,
    TelegramNotificationModule,
    AnimalImagesModule,
    NewsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, VactinationService, TransactionsService],
})
export class AppModule {}
