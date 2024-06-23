import { DataSource } from 'typeorm';
import { ONG } from './entities/ong.entity';

export const ongsProviders = [
  {
    provide: 'ONGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ONG),
    inject: ['DATA_SOURCE']
  }
];
