import { Module } from '@nestjs/common';
import { AnimalPicturesController } from './animalPictures.controller';
import { AnimalPicturesService } from './animalPictures.service';
import { DatabaseModule } from '../../database/database.module';
import { animalPicturesProviders } from './animalPictures.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalPicturesController],
  providers: [AnimalPicturesService, ...animalPicturesProviders],
  exports: [AnimalPicturesService]
})
export class AnimalPicturesModule {}
