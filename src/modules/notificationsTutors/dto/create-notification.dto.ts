import { IsBoolean, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsBoolean()
  read: boolean;

  @IsString()
  readonly subject: string;

  @IsString()
  readonly tutorId: string;

  @IsString()
  readonly ongPicture: string;
}
