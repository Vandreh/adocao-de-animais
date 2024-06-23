import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
    @IsOptional()
    @IsDate()
    updated_at: Date;
  
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}
