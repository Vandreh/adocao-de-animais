import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateONGDto {
  @IsString()
  readonly cnpj: string;

  @IsString()
  readonly description: string;
  
  @IsString()
  readonly avatar: string;
  
  @IsString()
  readonly banner: string;
  
  @IsString()
  readonly isApproved: boolean;

  @IsOptional()
  @IsString()
  readonly user_id: string;
  
  @IsOptional()
  @IsDate()
  readonly updated_at: Date;
  
  @IsOptional()
  @IsDate()
  readonly deleted_at: Date;
}
