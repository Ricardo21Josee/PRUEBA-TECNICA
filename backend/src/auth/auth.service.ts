import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { SigninDto, SignupDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existente = await this.usuariosService.findByEmail(dto.email);
    if (existente) {
      throw new ConflictException('El email ya esta registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, this.SALT_ROUNDS);

    const usuario = await this.usuariosService.create({
      email: dto.email,
      password: hashedPassword,
      rol: dto.rol,
      idEstudiante: dto.idEstudiante ?? null,
    });

    return this.buildAuthResponse(usuario);
  }

  async signin(dto: SigninDto) {
    const usuario = await this.usuariosService.findByEmail(dto.email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const passwordValido = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    return this.buildAuthResponse(usuario);
  }

  private buildAuthResponse(usuario: {
    idUsuario: number;
    email: string;
    rol: string;
    idEstudiante: string | null;
  }) {
    const payload: JwtPayload = {
      sub: usuario.idUsuario,
      email: usuario.email,
      rol: usuario.rol as JwtPayload['rol'],
      idEstudiante: usuario.idEstudiante,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      usuario: {
        idUsuario: usuario.idUsuario,
        email: usuario.email,
        rol: usuario.rol,
        idEstudiante: usuario.idEstudiante,
      },
    };
  }
}
