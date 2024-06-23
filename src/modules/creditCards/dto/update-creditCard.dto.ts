import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreateCreditCardDto } from './create-creditCard.dto';

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {
    @IsOptional()
    @IsDate()
    updated_at: Date;
  
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}
