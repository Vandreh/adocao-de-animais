import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { DatabaseModule } from '../../database/database.module';
import { donationsProviders } from './donations.providers';
import { TutorsService } from '../tutors/tutors.service';
import { tutorsProviders } from '../tutors/tutors.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DonationsController],
  providers: [DonationsService, ...donationsProviders, TutorsService, ...tutorsProviders],
  exports: [DonationsService]
})
export class DonationsModule {}
