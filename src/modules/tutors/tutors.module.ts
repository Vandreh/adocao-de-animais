import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";

import { DatabaseModule } from '../../database/database.module';

import { TutorsController } from './tutors.controller';
import { TutorsService } from './tutors.service';
import { tutorsProviders } from './tutors.providers';

@Module({
  imports: [DatabaseModule,
    JwtModule.register({})],
  controllers: [TutorsController],
  providers: [TutorsService,
    ...tutorsProviders,
  ],
  exports: [TutorsService]
})
export class TutorsModule {}
