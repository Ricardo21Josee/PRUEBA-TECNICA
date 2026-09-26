import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { estudianteGuard } from './core/guards/estudiante.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (m) => m.SignupComponent,
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
      {
        path: 'estudiantes',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/estudiantes/estudiantes.component').then(
            (m) => m.EstudiantesComponent,
          ),
      },
      {
        path: 'cursos',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/cursos/cursos.component').then(
            (m) => m.CursosComponent,
          ),
      },
      {
        path: 'asignaciones',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/asignaciones/asignaciones.component').then(
            (m) => m.AsignacionesComponent,
          ),
      },
      {
        path: 'mis-cursos',
        canActivate: [estudianteGuard],
        loadComponent: () =>
          import('./features/mis-cursos/mis-cursos.component').then(
            (m) => m.MisCursosComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];