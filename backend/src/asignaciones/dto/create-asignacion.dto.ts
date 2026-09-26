import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAsignacionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  idEstudiante: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  idCurso: string;
}
