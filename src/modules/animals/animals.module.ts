import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { DatabaseModule } from '../../database/database.module';
import { animalsProviders } from './animals.providers';
import { ONGsService } from '../ongs/ongs.service';
import { ongsProviders } from '../ongs/ongs.providers';
import { AnimalPicturesService } from '../animalPictures/animalPictures.service';
import { animalPicturesProviders } from '../animalPictures/animalPictures.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, ...animalsProviders, ONGsService, ...ongsProviders, AnimalPicturesService, ...animalPicturesProviders],
  exports: [AnimalsService]
})
export class AnimalsModule {}
