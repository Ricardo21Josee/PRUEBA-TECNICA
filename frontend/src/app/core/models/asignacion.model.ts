export interface CreateAsignacionDto {
  idEstudiante: string;
  idCurso: string;
}

export interface AsignacionResponse {
  message: string;
  asignacion: {
    idEstudiante: string;
    idCurso: string;
  };
}