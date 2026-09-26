import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CursoEstudiante } from '../../asignaciones/entities/curso-estudiante.entity';

@Entity('Estudiante')
export class Estudiante {
  @PrimaryColumn({ name: 'idEstudiante', length: 15 })
  idEstudiante: string;

  @Column({ name: 'nombre', length: 100 })
  nombre: string;

  @Column({ name: 'apellido', length: 100 })
  apellido: string;

  @Column({ name: 'nivel', length: 30 })
  nivel: string;

  @Column({ name: 'grado', length: 15 })
  grado: string;

  @Column({ name: 'idCarrera', length: 10 })
  idCarrera: string;

  @Column({ name: 'seccion', length: 5 })
  seccion: string;

  @OneToMany(() => CursoEstudiante, (ce) => ce.estudiante, {
    cascade: true,
  })
  cursosAsignados: CursoEstudiante[];
}
