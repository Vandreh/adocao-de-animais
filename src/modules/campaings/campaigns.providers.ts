import { DataSource } from 'typeorm';
import { Campaign } from './entities/campaign.entity';

export const campaignsProviders = [
  {
    provide: 'CAMPAIGNS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Campaign),
    inject: ['DATA_SOURCE'],
  }
];
