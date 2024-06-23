import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly castrated: boolean;

  @IsBoolean()
  readonly hasVermifugation: boolean;
  
  @IsBoolean()
  readonly vaccinated: boolean;
  
  @IsBoolean()
  readonly hasInjuries: boolean;

  @IsString()
  readonly state: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly observation: string;
  
  @IsString()
  readonly sexo: string;

  @IsString()
  @IsOptional()
  readonly size: string;

  @IsString()
  readonly species: string;

  @IsString()
  readonly bornDate: string;

  @IsString()
  readonly raca: string;

  @IsDate()
  @IsOptional()
  shelterEnterDate: Date;

  @IsString()
  @IsOptional()
  ongId: string;

  @IsOptional()
  @IsDate()
  updated_at: Date;
  
  @IsOptional()
  @IsDate()
  deleted_at: Date;
}
