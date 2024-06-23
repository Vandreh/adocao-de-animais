import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @IsOptional()
    @IsDate()
    updated_at: Date;
  
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}
