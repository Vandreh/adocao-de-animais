import { DataSource } from 'typeorm';
import { TutorNotification } from './entities/notification.entity';

export const notificationsProviders = [
  {
    provide: 'NOTIFICATIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TutorNotification),
    inject: ['DATA_SOURCE'],
  }
];
