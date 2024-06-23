import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreatePatronizeDto } from './create-patronize.dto';

export class UpdatePatronizeDto extends PartialType(CreatePatronizeDto) {
    @IsOptional()
    @IsDate()
    updated_at: Date;
  
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}
