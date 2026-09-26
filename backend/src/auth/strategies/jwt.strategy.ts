import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { RolUsuario } from '../../usuarios/entities/usuario.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  rol: RolUsuario;
  idEstudiante: string | null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly usuariosService: UsuariosService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') ?? 'default_secret',
    });
  }

  async validate(payload: JwtPayload) {
    const usuario = await this.usuariosService.findById(payload.sub);
    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Usuario no valido o inactivo');
    }
    return {
      idUsuario: usuario.idUsuario,
      email: usuario.email,
      rol: usuario.rol,
      idEstudiante: usuario.idEstudiante,
    };
  }
}
