import { IsOptional, IsString } from 'class-validator';

export class CreatePatronizeDto {
  @IsString()
  readonly status: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly conclusion_date: string;

  @IsString()
  readonly planName: string;

  @IsString()
  readonly planAmount: string;
  
  @IsString()
  readonly planId: string;

  @IsString()
  readonly signatureId: string;
  
  @IsOptional()
  @IsString()
  tutorId: string;

  @IsString()
  readonly animalId: string;
}
