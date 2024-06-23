import { Module } from '@nestjs/common';
import { SignaturesController } from './signatures.controller';
import { SignaturesService } from './signatures.service';
import { DatabaseModule } from '../../database/database.module';
import { donationsProviders } from './signatures.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SignaturesController],
  providers: [SignaturesService, ...donationsProviders],
  exports: [SignaturesService]
})
export class SignaturesModule {}
