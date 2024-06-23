import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { DatabaseModule } from '../../database/database.module';
import { notificationsProviders } from './notifications.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, ...notificationsProviders],
  exports: [NotificationsService]
})
export class ONGNotificationsModule {}
