import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreateONGDto } from './create-ong.dto';

export class UpdateONGDto extends PartialType(CreateONGDto) {
  @IsOptional()
  @IsDate()
  updated_at: Date;

  @IsOptional()
  @IsDate()
  deleted_at: Date;
}
