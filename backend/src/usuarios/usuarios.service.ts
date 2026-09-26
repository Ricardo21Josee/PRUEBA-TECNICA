import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({
      where: { idUsuario: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  async create(data: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(usuario);
  }

  async updatePassword(id: number, hashedPassword: string): Promise<void> {
    await this.usuarioRepo.update(id, { password: hashedPassword });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }
}
