import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreateAnimalPictureDto } from './create-animalPicture.dto';

export class UpdateAnimalPictureDto extends PartialType(CreateAnimalPictureDto) {
    @IsOptional()
    @IsDate()
    updated_at: Date;
  
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}
