import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Curso } from '../../core/models';
import { CursosService } from '../../core/services/cursos.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  private readonly cursosService = inject(CursosService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  cursos: Curso[] = [];
  loading = false;
  saving = false;

  modalOpen = false;
  editMode = false;
  editingId: string | null = null;

  form = this.fb.group({
    idCurso: ['', [Validators.required, Validators.maxLength(15)]],
    nombreCurso: ['', [Validators.required, Validators.maxLength(100)]],
    idGrado: ['1ER', [Validators.required]],
    idCarrera: ['INGSIS', [Validators.required]],
    creditos: [3, [Validators.required, Validators.min(1)]],
    catedratico: this.fb.array([]),
  });

  readonly carreras = [
    { id: 'INGSIS', nombre: 'Ingeniería en Sistemas' },
    { id: 'INGCIV', nombre: 'Ingeniería Civil' },
    { id: 'ADMON', nombre: 'Administración de Empresas' },
    { id: 'MED', nombre: 'Medicina' },
    { id: 'CONTA', nombre: 'Contaduría Pública' },
  ];

  readonly grados = ['1ER', '2DO', '3ER', '4TO', '5TO'];

  readonly catedraticosDisponibles = [
    { idCatedratico: 'OGARCIA', nombreCatedratico: 'Oscar García' },
    { idCatedratico: 'MLOPEZ', nombreCatedratico: 'María López' },
    { idCatedratico: 'JPEREZ', nombreCatedratico: 'Juan Pérez' },
    { idCatedratico: 'RMENDEZ', nombreCatedratico: 'Rosa Méndez' },
    { idCatedratico: 'ACASTRO', nombreCatedratico: 'Andrés Castro' },
  ];

  get catedraticos(): FormArray {
    return this.form.get('catedratico') as FormArray;
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.cursosService.findAll().subscribe({
      next: (data) => {
        this.cursos = data;
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
  }

  abrirCrear(): void {
    this.editMode = false;
    this.editingId = null;
    this.form.reset({
      idCurso: '',
      nombreCurso: '',
      idGrado: '1ER',
      idCarrera: 'INGSIS',
      creditos: 3,
    });
    this.catedraticos.clear();
    this.form.get('idCurso')?.enable();
    this.modalOpen = true;
  }

  abrirEditar(curso: Curso): void {
    this.editMode = true;
    this.editingId = curso.idCurso;
    this.form.patchValue({
      idCurso: curso.idCurso,
      nombreCurso: curso.nombreCurso,
      idGrado: curso.idGrado,
      idCarrera: curso.idCarrera,
      creditos: curso.creditos,
    });
    this.catedraticos.clear();
    for (const cat of curso.catedratico ?? []) {
      this.catedraticos.push(
        this.fb.group({
          idCatedratico: [cat.idCatedratico, Validators.required],
          nombreCatedratico: [cat.nombreCatedratico, Validators.required],
        }),
      );
    }
    this.form.get('idCurso')?.disable();
    this.modalOpen = true;
  }

  agregarCatedratico(): void {
    this.catedraticos.push(
      this.fb.group({
        idCatedratico: ['', Validators.required],
        nombreCatedratico: ['', Validators.required],
      }),
    );
  }

  quitarCatedratico(index: number): void {
    this.catedraticos.removeAt(index);
  }

  onSelectCatedratico(index: number, idCatedratico: string): void {
    const cat = this.catedraticosDisponibles.find(
      (c) => c.idCatedratico === idCatedratico,
    );
    if (cat) {
      this.catedraticos.at(index).patchValue({
        idCatedratico: cat.idCatedratico,
        nombreCatedratico: cat.nombreCatedratico,
      });
    }
  }

  cerrarModal(): void {
    this.modalOpen = false;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Formulario inválido', 'Revisa los campos obligatorios');
      return;
    }

    this.saving = true;
    const raw = this.form.getRawValue();
    const payload = {
      nombreCurso: raw.nombreCurso ?? '',
      idGrado: raw.idGrado ?? '1ER',
      idCarrera: raw.idCarrera ?? 'INGSIS',
      creditos: raw.creditos ?? 3,
      catedratico: (raw.catedratico ?? [])
        .filter(
          (
            cat,
          ): cat is {
            idCatedratico: string;
            nombreCatedratico: string;
          } =>
            !!cat &&
            typeof cat === 'object' &&
            !!('idCatedratico' in cat) &&
            !!('nombreCatedratico' in cat) &&
            !!cat.idCatedratico &&
            !!cat.nombreCatedratico,
        )
        .map((cat) => ({
          idCatedratico: cat.idCatedratico,
          nombreCatedratico: cat.nombreCatedratico,
        })),
    };

    if (this.editMode && this.editingId) {
      this.cursosService.update(this.editingId, payload).subscribe({
        next: () => {
          this.saving = false;
          this.modalOpen = false;
          this.toast.success('Curso actualizado');
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
      this.cursosService
        .create({
          idCurso: raw.idCurso ?? '',
          ...payload,
        })
        .subscribe({
          next: () => {
            this.saving = false;
            this.modalOpen = false;
            this.toast.success('Curso creado');
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

  async eliminar(curso: Curso): Promise<void> {
    const ok = await this.toast.confirm(
      '¿Eliminar curso?',
      `${curso.nombreCurso} (${curso.idCurso}) será eliminado.`,
    );
    if (!ok) return;

    this.cursosService.remove(curso.idCurso).subscribe({
      next: () => {
        this.toast.success('Curso eliminado');
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