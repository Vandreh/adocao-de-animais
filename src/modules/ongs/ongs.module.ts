import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { ONGsController } from './ongs.controller';
import { ONGsService } from './ongs.service';
import { ongsProviders } from './ongs.providers';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  controllers: [ONGsController],
  providers: [ONGsService, ...ongsProviders ],
  exports: [ONGsService]
})
export class ONGsModule {}
