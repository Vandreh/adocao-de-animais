import { DataSource } from 'typeorm';
import { CreditCard } from './entities/creditCard.entity';

export const creditCardsProviders = [
  {
    provide: 'CREDITCARDS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CreditCard),
    inject: ['DATA_SOURCE'],
  }
];
