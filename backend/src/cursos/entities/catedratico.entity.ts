import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CursoCatedratico } from './curso-catedratico.entity';

@Entity('Catedratico')
export class Catedratico {
  @PrimaryColumn({ name: 'idCatedratico', length: 15 })
  idCatedratico: string;

  @Column({ name: 'nombreCatedratico', length: 100 })
  nombreCatedratico: string;

  @Column({ name: 'email', length: 100, nullable: true })
  email: string | null;

  @OneToMany(() => CursoCatedratico, (cc) => cc.catedratico)
  cursos: CursoCatedratico[];
}
