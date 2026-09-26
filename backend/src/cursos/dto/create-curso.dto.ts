import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CatedraticoItemDto {
  @IsString()
  @IsNotEmpty()
  idCatedratico: string;

  @IsString()
  @IsNotEmpty()
  nombreCatedratico: string;
}

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty({ message: 'El id del curso es obligatorio' })
  @MaxLength(15)
  idCurso: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del curso es obligatorio' })
  @MaxLength(100)
  nombreCurso: string;

  @IsString()
  @IsNotEmpty({ message: 'El grado es obligatorio' })
  @MaxLength(15)
  idGrado: string;

  @IsString()
  @IsNotEmpty({ message: 'La carrera es obligatoria' })
  @MaxLength(10)
  idCarrera: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  creditos?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CatedraticoItemDto)
  catedratico?: CatedraticoItemDto[];
}
