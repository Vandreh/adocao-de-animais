import { IsOptional, IsString } from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  readonly creditCardId: 'Credito' | 'Debito';
  
  @IsString()
  readonly last4CardNumber: string;

  @IsString()
  readonly expirationMonth: string;

  @IsString()
  readonly expirationYear: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsOptional()
  @IsString()
  tutorId: string;
}
