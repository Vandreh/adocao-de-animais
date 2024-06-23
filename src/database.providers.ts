import { DataSource } from 'typeorm';
import { CreateUserTable1639414527318 } from './database/migrations/1639414527318-CreateUserTable';
import { CreateTutorTable1639414538333 } from './database/migrations/1639414538333-CreateTutorTable';
import { CreateOrganizations1639504874319 } from './database/migrations/1639504874319-CreateOrganizations';
import { CreateAnimalsTable1639587391898 } from './database/migrations/1639587391898-CreateAnimalsTable';
import { CreateAdressTable1639681345044 } from './database/migrations/1639681345044-CreateAddressTable';
import { CreateCampaignTable1639682583586 } from './database/migrations/1639682583586-CreateCampaignTable';
import { CreateAnimalsPicture1640267261912 } from './database/migrations/1640267261912-CreateAnimalsPicture';
import { CreateUserTokens1640294911515 } from './database/migrations/1640294911515-CreateUserToken';
import { CreateAddressfk1641230821441 } from './database/migrations/1641230821441-CreateAddressfk';
import { CreateEventTable1641322134259 } from './database/migrations/1641322134259-CreateEventTable';
import { CreateAdoptionsTable1641413045226 } from './database/migrations/1641413045226-CreateAdoptionsTable';
import { CreateTutorNotificationTable1641488727251 } from './database/migrations/1641488727251-CreateTutorNotificationTable';
import { CreateOngNotificationTable1641488744583 } from './database/migrations/1641488744583-CreateOngNotificationTable';
import { CreateCreditCardsTable1642172248649 } from './database/migrations/1642172248649-CreateCreditCardsTable';
import { CreateBankAccountsTable1642182655936 } from './database/migrations/1642182655936-CreateBankAccountsTable';
import { createSignatureTable1642690228763 } from './database/migrations/1642690228763-createSignatureTable';
import { createPatronizeTable1642690424860 } from './database/migrations/1642690424860-createPatronizeTable';
import { createReceiptTable1642691085155 } from './database/migrations/1642691085155-createReceiptTable';
import { createAccountForeignKey1643209108729 } from './database/migrations/1643209108729-createAccountForeignKey';
import { createDonateTable1643209200716 } from './database/migrations/1643209200716-createDonateTable';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost', // para rodar no linux substituir por host: 'db', windows 'localhost'
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'campanhaanimal',
        entities: [`${__dirname}/modules/**/entities/*.{ts,js}`],
        synchronize: false,
      });
      
      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'campanhaanimal',
  entities: [`${__dirname}/modules/**/entities/*.{ts,js}`],
  synchronize: false,
  migrations: [
    CreateUserTable1639414527318,
    CreateTutorTable1639414538333,
    CreateOrganizations1639504874319,
    CreateAnimalsTable1639587391898,
    CreateAdressTable1639681345044,
    CreateCampaignTable1639682583586,
    CreateAnimalsPicture1640267261912,
    CreateUserTokens1640294911515,
    CreateAddressfk1641230821441,
    CreateEventTable1641322134259,
    CreateAdoptionsTable1641413045226,
    CreateTutorNotificationTable1641488727251,
    CreateOngNotificationTable1641488744583,
    CreateCreditCardsTable1642172248649,
    CreateBankAccountsTable1642182655936,
    createSignatureTable1642690228763,
    createPatronizeTable1642690424860,
    createReceiptTable1642691085155,
    createAccountForeignKey1643209108729,
    createDonateTable1643209200716
  ],
});
