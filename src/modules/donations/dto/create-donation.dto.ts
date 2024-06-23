import { IsOptional, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  readonly status: string;

  @IsString()
  readonly donationDate: string;

  @IsString()
  readonly amount: string;

  @IsOptional()
  @IsString()
  tutorId: string;

  @IsString()
  readonly campaignId: string;
}
