import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante, Curso } from '../../core/models';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { CursosService } from '../../core/services/cursos.service';
import { AsignacionesService } from '../../core/services/asignaciones.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css'],
})
export class AsignacionesComponent implements OnInit {
  private readonly estudiantesService = inject(EstudiantesService);
  private readonly cursosService = inject(CursosService);
  private readonly asignacionesService = inject(AsignacionesService);
  private readonly toast = inject(ToastService);

  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  loading = false;
  saving = false;

  idEstudianteSeleccionado = '';
  idCursoSeleccionado = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.estudiantesService.findAll().subscribe({
      next: (est) => {
        this.estudiantes = est;
        this.cursosService.findAll().subscribe({
          next: (cur) => {
            this.cursos = cur;
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.toast.error(
              'Error al cargar cursos',
              this.toast.extractErrorMessage(err),
            );
          },
        });
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(
          'Error al cargar estudiantes',
          this.toast.extractErrorMessage(err),
        );
      },
    });
  }

  get cursosDisponibles(): Curso[] {
    if (!this.idEstudianteSeleccionado) return [];
    const est = this.estudiantes.find(
      (e) => e.idEstudiante === this.idEstudianteSeleccionado,
    );
    if (!est) return this.cursos;
    const asignados = new Set(
      (est.cursosAsignados ?? []).map((c) => c.idCurso),
    );
    return this.cursos.filter((c) => !asignados.has(c.idCurso));
  }

  get cursosAsignados(): Curso[] {
    if (!this.idEstudianteSeleccionado) return [];
    const est = this.estudiantes.find(
      (e) => e.idEstudiante === this.idEstudianteSeleccionado,
    );
    if (!est) return [];
    const ids = new Set((est.cursosAsignados ?? []).map((c) => c.idCurso));
    return this.cursos.filter((c) => ids.has(c.idCurso));
  }

  get estudianteActual(): Estudiante | undefined {
    return this.estudiantes.find(
      (e) => e.idEstudiante === this.idEstudianteSeleccionado,
    );
  }

  asignar(): void {
    if (!this.idEstudianteSeleccionado || !this.idCursoSeleccionado) {
      this.toast.error('Selecciona un estudiante y un curso');
      return;
    }

    this.saving = true;
    this.asignacionesService
      .create({
        idEstudiante: this.idEstudianteSeleccionado,
        idCurso: this.idCursoSeleccionado,
      })
      .subscribe({
        next: () => {
          this.saving = false;
          this.toast.success('Curso asignado correctamente');
          this.idCursoSeleccionado = '';
          this.recargarEstudiantes();
        },
        error: (err) => {
          this.saving = false;
          this.toast.error(
            'Error al asignar',
            this.toast.extractErrorMessage(err),
          );
        },
      });
  }

  async quitar(curso: Curso): Promise<void> {
    const ok = await this.toast.confirm(
      '¿Quitar este curso?',
      `${curso.nombreCurso} será removido del estudiante.`,
    );
    if (!ok) return;

    this.asignacionesService
      .remove(this.idEstudianteSeleccionado, curso.idCurso)
      .subscribe({
        next: () => {
          this.toast.success('Curso removido');
          this.recargarEstudiantes();
        },
        error: (err) =>
          this.toast.error(
            'Error al remover',
            this.toast.extractErrorMessage(err),
          ),
      });
  }

  private recargarEstudiantes(): void {
    this.estudiantesService.findAll().subscribe({
      next: (data) => (this.estudiantes = data),
      error: (err) =>
        this.toast.error(
          'Error al recargar',
          this.toast.extractErrorMessage(err),
        ),
    });
  }
}