import { DataSource } from 'typeorm';
import { BankAccount } from './entities/bankAccount.entity';

export const bankAccountsProviders = [
  {
    provide: 'BANKACCOUNTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BankAccount),
    inject: ['DATA_SOURCE'],
  }
];
