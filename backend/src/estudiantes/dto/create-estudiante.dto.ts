import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty({ message: 'El id del estudiante es obligatorio' })
  @MaxLength(15)
  idEstudiante: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MaxLength(100)
  apellido: string;

  @IsString()
  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @MaxLength(30)
  nivel: string;

  @IsString()
  @IsNotEmpty({ message: 'El grado es obligatorio' })
  @MaxLength(15)
  grado: string;

  @IsString()
  @IsNotEmpty({ message: 'La carrera es obligatoria' })
  @MaxLength(10)
  idCarrera: string;

  @IsString()
  @IsNotEmpty({ message: 'La seccion es obligatoria' })
  @MaxLength(5)
  seccion: string;
}
