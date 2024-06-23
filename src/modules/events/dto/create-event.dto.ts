import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  readonly name: string;
  
  @IsEmail()
  readonly email: string;
  
  @IsString()
  readonly type: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly date: string;

  @IsBoolean()
  isApproved: boolean;

  @IsString()
  readonly picture: string;

  @IsString()
  readonly ongId: string;

  @IsString()
  readonly addressId: string;
}
