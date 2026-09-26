import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AsignacionResponse,
  CreateAsignacionDto,
  EstudianteConCursos,
} from '../models';

@Injectable({ providedIn: 'root' })
export class AsignacionesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/asignaciones`;

  create(dto: CreateAsignacionDto): Observable<AsignacionResponse> {
    return this.http.post<AsignacionResponse>(this.apiUrl, dto);
  }

  remove(idEstudiante: string, idCurso: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${idEstudiante}/${idCurso}`,
    );
  }

  findMisCursos(): Observable<EstudianteConCursos> {
    return this.http.get<EstudianteConCursos>(`${this.apiUrl}/mis-cursos`);
  }
}