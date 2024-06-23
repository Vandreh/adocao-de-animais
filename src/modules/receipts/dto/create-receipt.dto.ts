import { IsOptional, IsString } from 'class-validator';

export class CreateReceiptDto {
  @IsString()
  readonly status: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly creation_date: string;

  @IsString()
  readonly transfer_date: string;

  @IsString()
  readonly patronizeId: string;
}
