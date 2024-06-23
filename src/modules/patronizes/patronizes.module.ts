import { Module } from '@nestjs/common';
import { PatronizeController } from './patronizes.controller';
import { PatronizeService } from './patronizes.service';
import { DatabaseModule } from '../../database/database.module';
import { patronizesProviders } from './patronizes.providers';
import { TutorsService } from '../tutors/tutors.service';
import { tutorsProviders } from '../tutors/tutors.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PatronizeController],
  providers: [PatronizeService, ...patronizesProviders, TutorsService, ...tutorsProviders],
  exports: [PatronizeService]
})
export class PatronizesModule {}
