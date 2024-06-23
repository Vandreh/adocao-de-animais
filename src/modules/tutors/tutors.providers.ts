import { DataSource } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Tutor } from './entities/tutor.entity';

export const tutorsProviders = [
  {
    provide: 'TUTORS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tutor),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
