import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RolUsuario } from '../../usuarios/entities/usuario.entity';

export class SignupDto {
  @IsEmail({}, { message: 'El email no es valido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contrasena debe tener al menos 6 caracteres' })
  password: string;

  @IsEnum(RolUsuario, { message: 'El rol debe ser ADMIN o ESTUDIANTE' })
  rol: RolUsuario;

  @IsOptional()
  @IsString()
  idEstudiante?: string;
}
