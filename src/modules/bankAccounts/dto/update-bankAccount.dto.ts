import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreateBankAccountDto } from './create-bankAccount.dto';

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {
    @IsOptional()
    @IsDate()
    updated_at: Date;
  
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}
