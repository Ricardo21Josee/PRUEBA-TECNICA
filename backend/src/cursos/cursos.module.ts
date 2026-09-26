import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Catedratico } from './entities/catedratico.entity';
import { CursoCatedratico } from './entities/curso-catedratico.entity';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Catedratico, CursoCatedratico])],
  controllers: [CursosController],
  providers: [CursosService],
  exports: [CursosService, TypeOrmModule],
})
export class CursosModule {}
