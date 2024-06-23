import { Module } from '@nestjs/common';
import { CreditCardsController } from './creditCards.controller';
import { CreditCardsService } from './creditCards.service';
import { DatabaseModule } from '../../database/database.module';
import { creditCardsProviders } from './creditCards.providers';
import { TutorsService } from '../tutors/tutors.service';
import { tutorsProviders } from '../tutors/tutors.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CreditCardsController],
  providers: [CreditCardsService, ...creditCardsProviders, TutorsService, ...tutorsProviders],
  exports: [CreditCardsService]
})
export class CreditCardsModule {}
