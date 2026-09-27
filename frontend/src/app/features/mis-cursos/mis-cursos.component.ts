import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteConCursos } from '../../core/models';
import { AsignacionesService } from '../../core/services/asignaciones.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css'],
})
export class MisCursosComponent implements OnInit {
  private readonly asignacionesService = inject(AsignacionesService);
  private readonly toast = inject(ToastService);

  estudiante: EstudianteConCursos | null = null;
  loading = false;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.asignacionesService.findMisCursos().subscribe({
      next: (data) => {
        this.estudiante = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(
          'Error al cargar tus cursos',
          this.toast.extractErrorMessage(err),
        );
      },
    });
  }
}