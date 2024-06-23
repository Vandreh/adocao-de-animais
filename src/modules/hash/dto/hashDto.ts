import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class HashDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
