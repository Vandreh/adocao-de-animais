import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAdoptionDto {
  @IsString()
  status: 'Aprovado' | 'Negado' | 'Em analise' | 'Desistido';
  
  @IsOptional()
  @IsString()
  tutorId: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  animalId: string;

  @IsOptional()
  @IsDate()
  requestDate: Date;
  
  @IsOptional()
  @IsDate()
  conclusionDate: Date;
}
