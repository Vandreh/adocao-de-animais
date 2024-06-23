import { DataSource } from 'typeorm';
import { Receipt } from './entities/receipt.entity';

export const receiptsProviders = [
  {
    provide: 'RECEIPTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Receipt),
    inject: ['DATA_SOURCE'],
  }
];
