import { Module } from '@nestjs/common';
import { BankAccountsController } from './bankAccounts.controller';
import { BankAccountsService } from './bankAccounts.service';
import { DatabaseModule } from '../../database/database.module';
import { bankAccountsProviders } from './bankAccounts.providers';
import { ONGsService } from '../ongs/ongs.service';
import { ongsProviders } from '../ongs/ongs.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ...bankAccountsProviders, ONGsService, ...ongsProviders],
  exports: [BankAccountsService]
})
export class bankAccountsModule {}
