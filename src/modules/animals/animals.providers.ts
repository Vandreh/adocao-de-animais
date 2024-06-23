import { DataSource } from 'typeorm';
import { Animal } from './entities/animal.entity';

export const animalsProviders = [
  {
    provide: 'ANIMALS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Animal),
    inject: ['DATA_SOURCE'],
  }
];
