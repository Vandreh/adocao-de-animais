import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { DatabaseModule } from '../../database/database.module';
import { campaignsProviders } from './campaigns.providers';
import { ONGsService } from '../ongs/ongs.service';
import { ongsProviders } from '../ongs/ongs.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CampaignsController],
  providers: [CampaignsService, ...campaignsProviders, ONGsService, ...ongsProviders],
  exports: [CampaignsService]
})
export class CampaignsModule {}
