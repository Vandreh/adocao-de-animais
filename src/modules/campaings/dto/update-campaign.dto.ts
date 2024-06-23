import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateCampaignDto } from './create-campaign.dto';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
    @IsOptional()
    @IsString()
    picture: string;
    
    @IsOptional()
    @IsDate()
    updated_at: Date;
  
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}
