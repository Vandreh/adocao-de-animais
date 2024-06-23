import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { HashModule } from './modules/hash/hash.module';
import { AtGuard } from './modules/hash/common/guards';
import { TutorsModule } from './modules/tutors/tutors.module';
import { RolesGuard } from './roles/roles.guard';
import { TutorNotificationsModule } from './modules/notificationsTutors/notifications.module';
import { ONGNotificationsModule } from './modules/notificationsONGs/notifications.module';
import { AnimalsModule } from './modules/animals/animals.module';
import { AnimalPicturesModule } from './modules/animalPictures/animalPictures.module';
import { AdoptionsModule } from './modules/adoptions/adoptions.module';
import { EventsModule } from './modules/events/events.module';
import { CreditCardsModule } from './modules/creditCards/creditCards.module';
import { bankAccountsModule } from './modules/bankAccounts/bankAccounts.module';
import { CampaignsModule } from './modules/campaings/campaigns.module';
import { DonationsModule } from './modules/donations/donations.module';
import { SignaturesModule } from './modules/signatures/signatures.module';
import { PatronizesModule } from './modules/patronizes/patronizes.module';
import { ReceiptsModule } from './modules/receipts/receipts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HashModule,
    UsersModule,
    TutorsModule,
    TutorNotificationsModule,
    ONGNotificationsModule,
    AnimalsModule,
    AnimalPicturesModule,
    AdoptionsModule,
    EventsModule,
    CreditCardsModule,
    bankAccountsModule,
    CampaignsModule,
    DonationsModule,
    SignaturesModule,
    PatronizesModule,
    ReceiptsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
