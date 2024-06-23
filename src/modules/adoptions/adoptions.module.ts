import { Module } from '@nestjs/common';

import { AdoptionsController } from './adoptions.controller';
import { AdoptionsService } from './adoptions.service';
import { DatabaseModule } from '../../database/database.module';
import { adoptionsProviders } from './adoptions.providers';
import { TutorsService } from '../tutors/tutors.service';
import { tutorsProviders } from '../tutors/tutors.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AdoptionsController],
  providers: [AdoptionsService, ...adoptionsProviders, TutorsService, ...tutorsProviders],
  exports: [AdoptionsService]
})
export class AdoptionsModule {}
