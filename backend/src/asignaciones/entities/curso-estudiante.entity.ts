import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { Curso } from '../../cursos/entities/curso.entity';

@Entity('CursoEstudiante')
export class CursoEstudiante {
  @PrimaryColumn({ name: 'idEstudiante', length: 15 })
  idEstudiante: string;

  @PrimaryColumn({ name: 'idCurso', length: 15 })
  idCurso: string;

  @Column({
    name: 'fechaAsignacion',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  fechaAsignacion: Date;

  @ManyToOne(() => Estudiante, (e) => e.cursosAsignados, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEstudiante' })
  estudiante: Estudiante;

  @ManyToOne(() => Curso, (c) => c.estudiantesAsignados, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCurso' })
  curso: Curso;
}
