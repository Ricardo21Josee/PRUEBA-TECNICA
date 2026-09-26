import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateCursoDto, Curso, UpdateCursoDto } from '../models';

@Injectable({ providedIn: 'root' })
export class CursosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/cursos`;

  findAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  findOne(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateCursoDto): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateCursoDto): Observable<Curso> {
    return this.http.patch<Curso>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}