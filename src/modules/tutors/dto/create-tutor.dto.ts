import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateTutorDto {
  @IsString()
  readonly cpf: string;

  @IsString()
  readonly description: string;
  
  @IsString()
  readonly avatar: string;
  
  @IsString()
  readonly banner: string;
  
  @IsString()
  readonly adoptionRequirements: number;

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
