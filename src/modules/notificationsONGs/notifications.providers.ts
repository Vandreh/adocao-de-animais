import { DataSource } from 'typeorm';
import { ONGNotification } from './entities/notification.entity';

export const notificationsProviders = [
  {
    provide: 'NOTIFICATIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ONGNotification),
    inject: ['DATA_SOURCE'],
  }
];
