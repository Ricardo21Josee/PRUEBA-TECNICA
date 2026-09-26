import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto, UpdateEstudianteDto } from './dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
  ) {}

  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    const estudiante = this.estudianteRepo.create(dto);
    return this.estudianteRepo.save(estudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepo.find({
      relations: ['cursosAsignados', 'cursosAsignados.curso'],
      order: { idEstudiante: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Estudiante> {
    const estudiante = await this.estudianteRepo.findOne({
      where: { idEstudiante: id },
      relations: ['cursosAsignados', 'cursosAsignados.curso'],
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
    return estudiante;
  }

  async update(id: string, dto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.findOne(id);
    Object.assign(estudiante, dto);
    return this.estudianteRepo.save(estudiante);
  }

  async remove(id: string): Promise<{ message: string }> {
    const estudiante = await this.findOne(id);
    await this.estudianteRepo.remove(estudiante);
    return { message: `Estudiante ${id} eliminado correctamente` };
  }

  async findCursosByEstudiante(id: string) {
    const estudiante = await this.findOne(id);
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
