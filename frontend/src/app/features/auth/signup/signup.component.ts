import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { RolUsuario, SignupRequest } from '../../../core/models';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  loading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rol: ['ESTUDIANTE' as RolUsuario, [Validators.required]],
    idEstudiante: [''],
  });

  get esEstudiante(): boolean {
    return this.form.get('rol')?.value === 'ESTUDIANTE';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    if (raw.rol === 'ESTUDIANTE' && !raw.idEstudiante) {
      this.toast.error(
        'Falta el ID del estudiante',
        'Un usuario con rol ESTUDIANTE debe estar vinculado a un ID de estudiante existente.',
      );
      return;
    }

    const dto: SignupRequest = {
      email: raw.email!,
      password: raw.password!,
      rol: raw.rol as RolUsuario,
    };

    if (raw.rol === 'ESTUDIANTE' && raw.idEstudiante) {
      dto.idEstudiante = raw.idEstudiante;
    }

    this.loading = true;
    this.authService.signup(dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.toast.success('Cuenta creada', `Bienvenido ${res.usuario.email}`);
        const ruta =
          res.usuario.rol === 'ADMIN' ? '/estudiantes' : '/mis-cursos';
        this.router.navigate([ruta]);
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(
          'Error al crear la cuenta',
          this.toast.extractErrorMessage(err, 'No se pudo completar el registro'),
        );
      },
    });
  }
}