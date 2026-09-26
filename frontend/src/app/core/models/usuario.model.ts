export type RolUsuario = 'ADMIN' | 'ESTUDIANTE';

export interface Usuario {
  idUsuario: number;
  email: string;
  rol: RolUsuario;
  idEstudiante: string | null;
}

export interface AuthResponse {
  accessToken: string;
  usuario: Usuario;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  rol: RolUsuario;
  idEstudiante?: string;
}