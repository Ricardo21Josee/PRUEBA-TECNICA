import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateEstudianteDto,
  Estudiante,
  EstudianteConCursos,
  UpdateEstudianteDto,
} from '../models';

@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/estudiantes`;

  findAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  findOne(id: string): Observable<EstudianteConCursos> {
    return this.http.get<EstudianteConCursos>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateEstudianteDto): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateEstudianteDto): Observable<Estudiante> {
    return this.http.patch<Estudiante>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}