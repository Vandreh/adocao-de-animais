import { DataSource } from 'typeorm';
import { Patronize } from './entities/patronize.entity';

export const patronizesProviders = [
  {
    provide: 'PATRONIZES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Patronize),
    inject: ['DATA_SOURCE'],
  }
];
