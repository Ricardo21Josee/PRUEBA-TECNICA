import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsuariosSeedService.name);
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async onApplicationBootstrap() {
    const placeholders = await this.usuarioRepo.find({
      where: { password: 'PLACEHOLDER_HASH' },
    });

    if (placeholders.length === 0) {
      return;
    }

    for (const usuario of placeholders) {
      const passwordPlano =
        usuario.rol === 'ADMIN' ? 'Admin123*' : 'Estudiante123*';
      usuario.password = await bcrypt.hash(passwordPlano, this.SALT_ROUNDS);
      await this.usuarioRepo.save(usuario);
      this.logger.log(
        `Contrasena inicializada para ${usuario.email} (rol: ${usuario.rol})`,
      );
    }

    this.logger.log(
      `${placeholders.length} contrasenas inicializadas correctamente.`,
    );
  }
}
