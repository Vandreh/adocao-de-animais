import { IsString } from 'class-validator';

export class CreateAnimalPictureDto {

  @IsString()
  filename: string;

  @IsString()
  animalId: string;
}
