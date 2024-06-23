import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateBankAccountDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly document: string;

  @IsString()
  readonly documentType: string;

  @IsString()
  readonly bankNumber: string;
  
  @IsString()
  readonly accountNumber: string;

  @IsString()
  readonly agencyNumber: string;

  @IsString()
  readonly accountType: string;

  @IsOptional()
  @IsString()
  ongId: string;
}
