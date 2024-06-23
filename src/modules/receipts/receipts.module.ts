import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { DatabaseModule } from '../../database/database.module';
import { receiptsProviders } from './receipts.providers';
import { TutorsService } from '../tutors/tutors.service';
import { tutorsProviders } from '../tutors/tutors.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ...receiptsProviders, TutorsService, ...tutorsProviders],
  exports: [ReceiptsService]
})
export class ReceiptsModule {}
