import { DataSource } from 'typeorm';
import { AnimalPicture } from './entities/animalPicture.entity';

export const animalPicturesProviders = [
  {
    provide: 'ANIMALPICTURES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AnimalPicture),
    inject: ['DATA_SOURCE'],
  }
];
