import { IsString } from 'class-validator';

export class CreateSignatureDto {
  @IsString()
  readonly status: string;

  @IsString()
  readonly startsOn: string;

  @IsString()
  readonly createdOn: string;

  @IsString()
  readonly nextBillingDate: string;

  @IsString()
  readonly dueDay: string;

  @IsString()
  readonly accessLink: string;
}
