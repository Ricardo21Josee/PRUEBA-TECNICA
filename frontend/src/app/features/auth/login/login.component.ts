import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { SigninRequest } from '../../../core/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="brand">
          <span class="logo">🎓</span>
          <h1>Gestión Académica</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="field">
            <label>Email</label>
            <input
              type="email"
              [(ngModel)]="form.email"
              name="email"
              required
              email
              placeholder="admin@uni.edu"
            />
          </div>

          <div class="field">
            <label>Contraseña</label>
            <input
              type="password"
              [(ngModel)]="form.password"
              name="password"
              required
              minlength="6"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            class="btn-primary"
            [disabled]="loading || loginForm.invalid"
          >
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>

        <p class="signup-link">
          ¿No tienes cuenta?
          <a routerLink="/signup">Regístrate</a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .login-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
        padding: 20px;
      }
      .login-card {
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 400px;
      }
      .brand {
        text-align: center;
        margin-bottom: 32px;
      }
      .logo {
        font-size: 48px;
        display: block;
        margin-bottom: 8px;
      }
      .brand h1 {
        font-size: 22px;
        margin-bottom: 4px;
        color: #1e293b;
      }
      .brand p {
        color: #64748b;
        font-size: 14px;
      }
      .field {
        margin-bottom: 20px;
      }
      .field label {
        display: block;
        font-size: 13px;
        font-weight: 500;
        color: #334155;
        margin-bottom: 6px;
      }
      .field input {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 14px;
        transition: border 0.2s;
      }
      .field input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      .btn-primary {
        width: 100%;
        padding: 12px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .btn-primary:hover:not(:disabled) {
        background: #2563eb;
      }
      .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .signup-link {
        text-align: center;
        margin-top: 24px;
        font-size: 13px;
        color: #64748b;
      }
      .signup-link a {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
      }
    `,
  ],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  form: SigninRequest = { email: '', password: '' };
  loading = false;

  onSubmit(): void {
    if (!this.form.email || !this.form.password) return;

    this.loading = true;
    this.authService.signin(this.form).subscribe({
      next: (res) => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: res.usuario.email,
          timer: 1200,
          showConfirmButton: false,
        });
        const ruta =
          res.usuario.rol === 'ADMIN' ? '/estudiantes' : '/mis-cursos';
        this.router.navigate([ruta]);
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message ?? 'Credenciales inválidas';
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: Array.isArray(msg) ? msg.join(', ') : msg,
        });
      },
    });
  }
}