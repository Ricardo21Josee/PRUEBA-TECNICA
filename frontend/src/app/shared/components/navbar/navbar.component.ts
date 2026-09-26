import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="brand">
        <span class="logo">🎓</span>
        <span class="title">Gestión Académica</span>
      </div>

      <div class="links" *ngIf="authService.currentUser$ | async as user">
        <ng-container *ngIf="user.rol === 'ADMIN'">
          <a
            routerLink="/estudiantes"
            routerLinkActive="active"
            class="link"
          >
            Estudiantes
          </a>
          <a routerLink="/cursos" routerLinkActive="active" class="link">
            Cursos
          </a>
          <a
            routerLink="/asignaciones"
            routerLinkActive="active"
            class="link"
          >
            Asignaciones
          </a>
        </ng-container>

        <ng-container *ngIf="user.rol === 'ESTUDIANTE'">
          <a
            routerLink="/mis-cursos"
            routerLinkActive="active"
            class="link"
          >
            Mis Cursos
          </a>
        </ng-container>
      </div>

      <div class="user" *ngIf="authService.currentUser$ | async as user">
        <div class="user-info">
          <span class="email">{{ user.email }}</span>
          <span class="role" [class.admin]="user.rol === 'ADMIN'">
            {{ user.rol }}
          </span>
        </div>
        <button class="logout" (click)="logout()">Salir</button>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px;
        height: 64px;
        background: #1e293b;
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: 600;
      }
      .logo {
        font-size: 24px;
      }
      .links {
        display: flex;
        gap: 4px;
      }
      .link {
        color: #cbd5e1;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        transition: all 0.2s;
      }
      .link:hover {
        background: #334155;
        color: white;
      }
      .link.active {
        background: #3b82f6;
        color: white;
      }
      .user {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
      }
      .email {
        font-size: 13px;
        color: #e2e8f0;
      }
      .role {
        font-size: 11px;
        color: #94a3b8;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .role.admin {
        color: #fbbf24;
      }
      .logout {
        background: #ef4444;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: background 0.2s;
      }
      .logout:hover {
        background: #dc2626;
      }
    `,
  ],
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}