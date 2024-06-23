import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  readonly idCampaign: string;

  @IsString()
  readonly name: string;
  
  @IsString()
  readonly description: string;
  
  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isApproved: boolean;
  
  @IsString()
  readonly amountExpected: string;

  @IsString()
  readonly amountCollected: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  ongId: string;

  @IsString()
  readonly accountId: string;
}
