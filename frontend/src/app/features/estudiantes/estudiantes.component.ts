import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateEstudianteDto, Estudiante } from '../../core/models';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  private readonly estudiantesService = inject(EstudiantesService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  estudiantes: Estudiante[] = [];
  loading = false;
  saving = false;

  // modal
  modalOpen = false;
  editMode = false;
  editingId: string | null = null;

  form = this.fb.group({
    idEstudiante: ['', [Validators.required, Validators.maxLength(15)]],
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    nivel: ['Universitario', [Validators.required]],
    grado: ['1er', [Validators.required]],
    idCarrera: ['INGSIS', [Validators.required]],
    seccion: ['A', [Validators.required]],
  });

  readonly carreras = [
    { id: 'INGSIS', nombre: 'Ingeniería en Sistemas' },
    { id: 'INGCIV', nombre: 'Ingeniería Civil' },
    { id: 'ADMON', nombre: 'Administración de Empresas' },
    { id: 'MED', nombre: 'Medicina' },
    { id: 'CONTA', nombre: 'Contaduría Pública' },
  ];

  readonly grados = ['1er', '2do', '3er', '4to', '5to'];
  readonly secciones = ['A', 'B', 'C', 'D'];
  readonly niveles = ['Universitario', 'Diversificado'];

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.estudiantesService.findAll().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.loading = false;
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

  abrirCrear(): void {
    this.editMode = false;
    this.editingId = null;
    this.form.reset({
      idEstudiante: '',
      nombre: '',
      apellido: '',
      nivel: 'Universitario',
      grado: '1er',
      idCarrera: 'INGSIS',
      seccion: 'A',
    });
    this.form.get('idEstudiante')?.enable();
    this.modalOpen = true;
  }

  abrirEditar(est: Estudiante): void {
    this.editMode = true;
    this.editingId = est.idEstudiante;
    this.form.patchValue({
      idEstudiante: est.idEstudiante,
      nombre: est.nombre,
      apellido: est.apellido,
      nivel: est.nivel,
      grado: est.grado,
      idCarrera: est.idCarrera,
      seccion: est.seccion,
    });
    this.form.get('idEstudiante')?.disable();
    this.modalOpen = true;
  }

  cerrarModal(): void {
    this.modalOpen = false;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const raw = this.form.getRawValue();
    const estudianteDto: CreateEstudianteDto = {
      idEstudiante: raw.idEstudiante ?? '',
      nombre: raw.nombre ?? '',
      apellido: raw.apellido ?? '',
      nivel: raw.nivel ?? 'Universitario',
      grado: raw.grado ?? '1er',
      idCarrera: raw.idCarrera ?? 'INGSIS',
      seccion: raw.seccion ?? 'A',
    };

    if (this.editMode && this.editingId) {
      const { idEstudiante, ...rest } = estudianteDto;
      this.estudiantesService.update(this.editingId, rest).subscribe({
        next: () => {
          this.saving = false;
          this.modalOpen = false;
          this.toast.success('Estudiante actualizado');
          this.cargar();
        },
        error: (err) => {
          this.saving = false;
          this.toast.error(
            'Error al actualizar',
            this.toast.extractErrorMessage(err),
          );
        },
      });
    } else {
      this.estudiantesService.create(estudianteDto).subscribe({
        next: () => {
          this.saving = false;
          this.modalOpen = false;
          this.toast.success('Estudiante creado');
          this.cargar();
        },
        error: (err) => {
          this.saving = false;
          this.toast.error(
            'Error al crear',
            this.toast.extractErrorMessage(err),
          );
        },
      });
    }
  }

  async eliminar(est: Estudiante): Promise<void> {
    const ok = await this.toast.confirm(
      '¿Eliminar estudiante?',
      `${est.nombre} ${est.apellido} (${est.idEstudiante}) será eliminado.`,
    );
    if (!ok) return;

    this.estudiantesService.remove(est.idEstudiante).subscribe({
      next: () => {
        this.toast.success('Estudiante eliminado');
        this.cargar();
      },
      error: (err) =>
        this.toast.error(
          'Error al eliminar',
          this.toast.extractErrorMessage(err),
        ),
    });
  }
}