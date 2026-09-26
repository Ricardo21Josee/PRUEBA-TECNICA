export interface CursoAsignadoSimple {
  idCurso: string;
  nombreCurso: string;
}

export interface Estudiante {
  idEstudiante: string;
  nombre: string;
  apellido: string;
  nivel: string;
  grado: string;
  idCarrera: string;
  seccion: string;
  cursosAsignados?: CursoAsignadoSimple[];
}

export interface EstudianteConCursos extends Estudiante {
  cursosAsignados: CursoAsignadoSimple[];
}

export interface CreateEstudianteDto {
  idEstudiante: string;
  nombre: string;
  apellido: string;
  nivel: string;
  grado: string;
  idCarrera: string;
  seccion: string;
}

export type UpdateEstudianteDto = Partial<CreateEstudianteDto>;