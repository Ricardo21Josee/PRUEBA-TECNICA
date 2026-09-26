import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CursoEstudiante } from './entities/curso-estudiante.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { CreateAsignacionDto } from './dto';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(CursoEstudiante)
    private readonly asignacionRepo: Repository<CursoEstudiante>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
  ) {}

  async create(dto: CreateAsignacionDto) {
    const estudiante = await this.estudianteRepo.findOne({
      where: { idEstudiante: dto.idEstudiante },
    });
    if (!estudiante) {
      throw new NotFoundException(
        `Estudiante ${dto.idEstudiante} no encontrado`,
      );
    }

    const curso = await this.cursoRepo.findOne({
      where: { idCurso: dto.idCurso },
    });
    if (!curso) {
      throw new NotFoundException(`Curso ${dto.idCurso} no encontrado`);
    }

    const existente = await this.asignacionRepo.findOne({
      where: {
        idEstudiante: dto.idEstudiante,
        idCurso: dto.idCurso,
      },
    });
    if (existente) {
      throw new ConflictException('El estudiante ya tiene ese curso asignado');
    }

    const asignacion = this.asignacionRepo.create(dto);
    await this.asignacionRepo.save(asignacion);

    return {
      message: 'Curso asignado correctamente',
      asignacion: {
        idEstudiante: dto.idEstudiante,
        idCurso: dto.idCurso,
      },
    };
  }

  async remove(idEstudiante: string, idCurso: string) {
    const asignacion = await this.asignacionRepo.findOne({
      where: { idEstudiante, idCurso },
    });
    if (!asignacion) {
      throw new NotFoundException('Asignacion no encontrada');
    }
    await this.asignacionRepo.remove(asignacion);
    return { message: 'Asignacion eliminada correctamente' };
  }

  async findMisCursos(idEstudiante: string) {
    const estudiante = await this.estudianteRepo.findOne({
      where: { idEstudiante },
      relations: ['cursosAsignados', 'cursosAsignados.curso'],
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante ${idEstudiante} no encontrado`);
    }

    return {
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      nivel: estudiante.nivel,
      grado: estudiante.grado,
      idCarrera: estudiante.idCarrera,
      seccion: estudiante.seccion,
      cursosAsignados: estudiante.cursosAsignados.map((ce) => ({
        idCurso: ce.curso.idCurso,
        nombreCurso: ce.curso.nombreCurso,
      })),
    };
  }
}
