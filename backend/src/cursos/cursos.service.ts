import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { Catedratico } from './entities/catedratico.entity';
import { CursoCatedratico } from './entities/curso-catedratico.entity';
import { CreateCursoDto, UpdateCursoDto } from './dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
    @InjectRepository(Catedratico)
    private readonly catedraticoRepo: Repository<Catedratico>,
    @InjectRepository(CursoCatedratico)
    private readonly cursoCatRepo: Repository<CursoCatedratico>,
  ) {}

  async create(dto: CreateCursoDto) {
    const curso = this.cursoRepo.create({
      idCurso: dto.idCurso,
      nombreCurso: dto.nombreCurso,
      idGrado: dto.idGrado,
      idCarrera: dto.idCarrera,
      creditos: dto.creditos ?? 1,
    });
    await this.cursoRepo.save(curso);

    if (dto.catedratico && dto.catedratico.length > 0) {
      for (const item of dto.catedratico) {
        let cat = await this.catedraticoRepo.findOne({
          where: { idCatedratico: item.idCatedratico },
        });
        if (!cat) {
          cat = this.catedraticoRepo.create({
            idCatedratico: item.idCatedratico,
            nombreCatedratico: item.nombreCatedratico,
          });
          await this.catedraticoRepo.save(cat);
        }
        await this.cursoCatRepo.save({
          idCurso: curso.idCurso,
          idCatedratico: cat.idCatedratico,
        });
      }
    }

    return this.findOne(curso.idCurso);
  }

  async findAll() {
    const cursos = await this.cursoRepo.find({
      relations: ['catedraticos', 'catedraticos.catedratico'],
      order: { idCurso: 'ASC' },
    });
    return cursos.map((c) => this.toResponse(c));
  }

  async findOne(id: string) {
    const curso = await this.cursoRepo.findOne({
      where: { idCurso: id },
      relations: ['catedraticos', 'catedraticos.catedratico'],
    });
    if (!curso) {
      throw new NotFoundException(`Curso con id ${id} no encontrado`);
    }
    return this.toResponse(curso);
  }

  async update(id: string, dto: UpdateCursoDto) {
    const curso = await this.cursoRepo.findOne({ where: { idCurso: id } });
    if (!curso) {
      throw new NotFoundException(`Curso con id ${id} no encontrado`);
    }

    if (dto.nombreCurso) curso.nombreCurso = dto.nombreCurso;
    if (dto.idGrado) curso.idGrado = dto.idGrado;
    if (dto.idCarrera) curso.idCarrera = dto.idCarrera;
    if (dto.creditos !== undefined) curso.creditos = dto.creditos;
    await this.cursoRepo.save(curso);

    if (dto.catedratico) {
      await this.cursoCatRepo.delete({ idCurso: id });
      for (const item of dto.catedratico) {
        let cat = await this.catedraticoRepo.findOne({
          where: { idCatedratico: item.idCatedratico },
        });
        if (!cat) {
          cat = this.catedraticoRepo.create({
            idCatedratico: item.idCatedratico,
            nombreCatedratico: item.nombreCatedratico,
          });
          await this.catedraticoRepo.save(cat);
        }
        await this.cursoCatRepo.save({
          idCurso: id,
          idCatedratico: cat.idCatedratico,
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const curso = await this.cursoRepo.findOne({ where: { idCurso: id } });
    if (!curso) {
      throw new NotFoundException(`Curso con id ${id} no encontrado`);
    }
    await this.cursoRepo.remove(curso);
    return { message: `Curso ${id} eliminado correctamente` };
  }

  private toResponse(curso: Curso) {
    return {
      idCurso: curso.idCurso,
      nombreCurso: curso.nombreCurso,
      idGrado: curso.idGrado,
      idCarrera: curso.idCarrera,
      creditos: curso.creditos,
      catedratico: (curso.catedraticos ?? []).map((cc) => ({
        idCatedratico: cc.catedratico.idCatedratico,
        nombreCatedratico: cc.catedratico.nombreCatedratico,
      })),
    };
  }
}
