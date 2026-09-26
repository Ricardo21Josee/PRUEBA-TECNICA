import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosSeedService } from './usuarios.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService, UsuariosSeedService],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
