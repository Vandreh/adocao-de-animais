import { DataSource } from 'typeorm';
import { Signature } from './entities/signature.entity';

export const donationsProviders = [
  {
    provide: 'SIGNATURES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Signature),
    inject: ['DATA_SOURCE'],
  }
];
