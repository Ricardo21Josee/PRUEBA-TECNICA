import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';

export enum RolUsuario {
  ADMIN = 'ADMIN',
  ESTUDIANTE = 'ESTUDIANTE',
}

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idUsuario' })
  idUsuario: number;

  @Column({ name: 'email', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', length: 200 })
  password: string;

  @Column({ name: 'rol', length: 20 })
  rol: RolUsuario;

  @Column({ name: 'idEstudiante', length: 15, nullable: true })
  idEstudiante: string | null;

  @Column({ name: 'activo', type: 'tinyint', width: 1, default: 1 })
  activo: boolean;

  @Column({
    name: 'fechaCreacion',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @ManyToOne(() => Estudiante, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idEstudiante' })
  estudiante: Estudiante | null;
}
