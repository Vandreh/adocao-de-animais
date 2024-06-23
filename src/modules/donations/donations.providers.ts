import { DataSource } from 'typeorm';
import { Donation } from './entities/donation.entity';

export const donationsProviders = [
  {
    provide: 'DONATIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Donation),
    inject: ['DATA_SOURCE'],
  }
];
