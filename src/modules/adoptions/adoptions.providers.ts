import { DataSource } from 'typeorm';
import { Adoption } from './entities/adoption.entity';

export const adoptionsProviders = [
  {
    provide: 'ADOPTIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Adoption),
    inject: ['DATA_SOURCE'],
  }
];
