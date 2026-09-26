import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Curso } from './curso.entity';
import { Catedratico } from './catedratico.entity';

@Entity('CursoCatedratico')
export class CursoCatedratico {
  @PrimaryColumn({ name: 'idCurso', length: 15 })
  idCurso: string;

  @PrimaryColumn({ name: 'idCatedratico', length: 15 })
  idCatedratico: string;

  @ManyToOne(() => Curso, (curso) => curso.catedraticos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCurso' })
  curso: Curso;

  @ManyToOne(() => Catedratico, (cat) => cat.cursos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCatedratico' })
  catedratico: Catedratico;
}
