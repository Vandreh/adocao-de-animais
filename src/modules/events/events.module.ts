import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { DatabaseModule } from '../../database/database.module';
import { eventsProviders } from './events.providers';
import { ONGsService } from '../ongs/ongs.service';
import { ongsProviders } from '../ongs/ongs.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [EventsService, ...eventsProviders, ONGsService, ...ongsProviders],
  exports: [EventsService]
})
export class EventsModule {}
