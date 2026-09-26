export interface CatedraticoSimple {
  idCatedratico: string;
  nombreCatedratico: string;
}

export interface Curso {
  idCurso: string;
  nombreCurso: string;
  idGrado: string;
  idCarrera: string;
  creditos: number;
  catedratico: CatedraticoSimple[];
}

export interface CreateCursoDto {
  idCurso: string;
  nombreCurso: string;
  idGrado: string;
  idCarrera: string;
  creditos?: number;
  catedratico?: CatedraticoSimple[];
}

export type UpdateCursoDto = Partial<CreateCursoDto>;