import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CursoCatedratico } from './curso-catedratico.entity';
import { CursoEstudiante } from '../../asignaciones/entities/curso-estudiante.entity';

@Entity('Curso')
export class Curso {
  @PrimaryColumn({ name: 'idCurso', length: 15 })
  idCurso: string;

  @Column({ name: 'nombreCurso', length: 100 })
  nombreCurso: string;

  @Column({ name: 'idGrado', length: 15 })
  idGrado: string;

  @Column({ name: 'idCarrera', length: 10 })
  idCarrera: string;

  @Column({ name: 'creditos', type: 'int', default: 1 })
  creditos: number;

  @OneToMany(() => CursoCatedratico, (cc) => cc.curso, { cascade: true })
  catedraticos: CursoCatedratico[];

  @OneToMany(() => CursoEstudiante, (ce) => ce.curso)
  estudiantesAsignados: CursoEstudiante[];
}
