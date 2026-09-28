<h1 align="center">
  <b>Frontend — Angular SPA</b>
</h1>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=DD0031&center=true&vCenter=true&width=600&lines=Angular+17+SPA;Standalone+Components;JWT+Interceptors+%2B+Guards;RESTful+API+Consumer" alt="Typing SVG">
</div>

<br>

<div align="center">

  <img src="https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/RxJS-7-B7178C?style=for-the-badge&logo=reactivex&logoColor=white" alt="RxJS">
  <img src="https://img.shields.io/badge/SweetAlert2-UI-FF6F91?style=for-the-badge" alt="SweetAlert2">
  <img src="https://img.shields.io/badge/CSS-Puro-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">

</div>

<br>

<hr>

<h2>Tabla de Contenidos</h2>

<ul>
  <li><a href="#descripción">Descripción</a></li>
  <li><a href="#stack-tecnológico">Stack Tecnológico</a></li>
  <li><a href="#arquitectura">Arquitectura</a></li>
  <li><a href="#estructura-del-proyecto">Estructura del Proyecto</a></li>
  <li><a href="#instalación">Instalación</a></li>
  <li><a href="#scripts-disponibles">Scripts Disponibles</a></li>
  <li><a href="#rutas">Rutas</a></li>
  <li><a href="#autenticación">Autenticación</a></li>
  <li><a href="#guards">Guards</a></li>
  <li><a href="#interceptor-http">Interceptor HTTP</a></li>
  <li><a href="#servicios">Servicios</a></li>
  <li><a href="#modelos">Modelos</a></li>
  <li><a href="#componentes">Componentes</a></li>
  <li><a href="#manejo-de-errores">Manejo de Errores</a></li>
  <li><a href="#diseño-y-experiencia-de-usuario">Diseño y Experiencia de Usuario</a></li>
  <li><a href="#buenas-prácticas">Buenas Prácticas</a></li>
</ul>

<hr>

<h2 id="descripción">Descripción</h2>

<p>
  Frontend del sistema de gestión académica, construido con <b>Angular 17</b>
  usando <b>standalone components</b>. Consume la API REST del backend NestJS y
  ofrece una interfaz limpia para gestionar estudiantes, cursos y asignaciones,
  con autenticación JWT y control de acceso basado en roles.
</p>

<p>
  La aplicación se divide en dos experiencias según el rol del usuario:
</p>

<ul>
  <li><b>ADMIN</b>: panel completo con CRUD de estudiantes, cursos y asignaciones.</li>
  <li><b>ESTUDIANTE</b>: vista simplificada donde solo consulta sus cursos asignados.</li>
</ul>

<hr>

<h2 id="stack-tecnológico">Stack Tecnológico</h2>

<table>
  <thead>
    <tr>
      <th>Tecnología</th>
      <th>Versión</th>
      <th>Propósito</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Angular</td><td>17</td><td>Framework SPA con standalone components</td></tr>
    <tr><td>TypeScript</td><td>5</td><td>Lenguaje</td></tr>
    <tr><td>RxJS</td><td>7</td><td>Programación reactiva y HTTP</td></tr>
    <tr><td>SweetAlert2</td><td>—</td><td>Notificaciones y confirmaciones</td></tr>
    <tr><td>CSS puro</td><td>—</td><td>Estilos sin dependencias externas</td></tr>
    <tr><td>Angular Router</td><td>—</td><td>Enrutado con lazy loading</td></tr>
    <tr><td>Angular Forms</td><td>—</td><td>Reactive Forms con validaciones</td></tr>
  </tbody>
</table>

<hr>

<h2 id="arquitectura">Arquitectura</h2>

<p>
  El frontend sigue un patrón <b>modular por dominio</b> con separación clara
  entre <b>core</b> (servicios globales), <b>shared</b> (componentes
  reutilizables) y <b>features</b> (módulos funcionales).
</p>

<pre>
┌──────────────────────────────────────────────────────────┐
│                       AppComponent                       │
│                    (router-outlet)                       │
└───────────────────────────┬──────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
     ┌────────▼────────┐          ┌───────▼────────┐
     │   Login/Signup  │          │  LayoutComponent│
     │  (sin layout)   │          │   + Navbar      │
     └─────────────────┘          └────────┬────────┘
                                           │
                        ┌──────────────────┼──────────────────┐
                        │                  │                  │
                 ┌──────▼─────┐    ┌───────▼──────┐    ┌──────▼──────┐
                 │ Estudiantes│    │    Cursos    │    │Asignaciones │
                 └────────────┘    └──────────────┘    └─────────────┘
                                                              │
                                                     ┌────────▼────────┐
                                                     │   Mis Cursos    │
                                                     └─────────────────┘
</pre>

<h3>Capas</h3>

<table>
  <thead>
    <tr>
      <th>Capa</th>
      <th>Responsabilidad</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><b>Core</b></td><td>Servicios singleton, guards, interceptors, modelos. Solo se importa una vez.</td></tr>
    <tr><td><b>Shared</b></td><td>Componentes reutilizables (navbar, layout).</td></tr>
    <tr><td><b>Features</b></td><td>Módulos funcionales con lazy loading (auth, estudiantes, cursos, asignaciones, mis-cursos).</td></tr>
    <tr><td><b>Models</b></td><td>Interfaces TypeScript para tipar las respuestas de la API.</td></tr>
    <tr><td><b>Services</b></td><td>Comunicación HTTP con el backend.</td></tr>
    <tr><td><b>Guards</b></td><td>Protección de rutas según autenticación y rol.</td></tr>
    <tr><td><b>Interceptors</b></td><td>Inyección automática del JWT y manejo de errores globales.</td></tr>
  </tbody>
</table>

<hr>

<h2 id="estructura-del-proyecto">Estructura del Proyecto</h2>

<pre>
frontend/
├── src/
│   ├── app/
│   │   ├── core/                       # Servicios globales
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── admin.guard.ts
│   │   │   │   └── estudiante.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── usuario.model.ts
│   │   │   │   ├── estudiante.model.ts
│   │   │   │   ├── curso.model.ts
│   │   │   │   ├── asignacion.model.ts
│   │   │   │   └── index.ts
│   │   │   └── services/
│   │   │       ├── auth.service.ts
│   │   │       ├── estudiantes.service.ts
│   │   │       ├── cursos.service.ts
│   │   │       ├── asignaciones.service.ts
│   │   │       ├── toast.service.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── shared/                     # Componentes reutilizables
│   │   │   └── components/
│   │   │       ├── layout/
│   │   │       │   └── layout.component.ts
│   │   │       └── navbar/
│   │   │           └── navbar.component.ts
│   │   │
│   │   ├── features/                   # Módulos funcionales
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.css
│   │   │   │   └── signup/
│   │   │   │       ├── signup.component.ts
│   │   │   │       ├── signup.component.html
│   │   │   │       └── signup.component.css
│   │   │   ├── estudiantes/
│   │   │   │   ├── estudiantes.component.ts
│   │   │   │   ├── estudiantes.component.html
│   │   │   │   └── estudiantes.component.css
│   │   │   ├── cursos/
│   │   │   │   ├── cursos.component.ts
│   │   │   │   ├── cursos.component.html
│   │   │   │   └── cursos.component.css
│   │   │   ├── asignaciones/
│   │   │   │   ├── asignaciones.component.ts
│   │   │   │   ├── asignaciones.component.html
│   │   │   │   └── asignaciones.component.css
│   │   │   └── mis-cursos/
│   │   │       ├── mis-cursos.component.ts
│   │   │       ├── mis-cursos.component.html
│   │   │       └── mis-cursos.component.css
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── environments/
│   │   └── environment.ts              # Configuración de la API
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css                      # Estilos globales
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
</pre>

<hr>

<h2 id="instalación">Instalación</h2>

<h3>Requisitos previos</h3>

<ul>
  <li><b>Node.js</b> 18 o superior</li>
  <li><b>npm</b> 9 o superior</li>
  <li><b>Angular CLI</b> 17 (<code>npm install -g @angular/cli@17</code>)</li>
  <li>El <b>backend</b> corriendo en <code>http://localhost:3000/api</code></li>
</ul>

<h3>Pasos</h3>

<pre><code>cd frontend
npm install
npm start
</code></pre>

<p>La aplicación quedará disponible en <code>http://localhost:4200</code>.</p>

<hr>

<h2 id="scripts-disponibles">Scripts Disponibles</h2>

<table>
  <thead>
    <tr>
      <th>Comando</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>npm start</code></td><td>Inicia el servidor de desarrollo en <code>localhost:4200</code></td></tr>
    <tr><td><code>npm run build</code></td><td>Compila la aplicación para producción en <code>dist/</code></td></tr>
    <tr><td><code>npm run watch</code></td><td>Compila en modo watch con configuración de desarrollo</td></tr>
    <tr><td><code>npm test</code></td><td>Ejecuta tests unitarios</td></tr>
  </tbody>
</table>

<hr>

<h2 id="rutas">Rutas</h2>

<p>
  El enrutado usa <b>lazy loading</b> mediante <code>loadComponent</code>, y
  protege cada ruta con guards según autenticación y rol.
</p>

<table>
  <thead>
    <tr>
      <th>Ruta</th>
      <th>Componente</th>
      <th>Guard</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>/login</code></td><td>LoginComponent</td><td>—</td><td>Inicio de sesión</td></tr>
    <tr><td><code>/signup</code></td><td>SignupComponent</td><td>—</td><td>Registro</td></tr>
    <tr><td><code>/</code></td><td>LayoutComponent</td><td><code>authGuard</code></td><td>Layout con navbar</td></tr>
    <tr><td><code>/estudiantes</code></td><td>EstudiantesComponent</td><td><code>adminGuard</code></td><td>CRUD estudiantes</td></tr>
    <tr><td><code>/cursos</code></td><td>CursosComponent</td><td><code>adminGuard</code></td><td>CRUD cursos</td></tr>
    <tr><td><code>/asignaciones</code></td><td>AsignacionesComponent</td><td><code>adminGuard</code></td><td>Asignar cursos</td></tr>
    <tr><td><code>/mis-cursos</code></td><td>MisCursosComponent</td><td><code>estudianteGuard</code></td><td>Vista del estudiante</td></tr>
  </tbody>
</table>

<h3>Ejemplo de configuración de rutas</h3>

<pre><code>export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
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
      // ...
    ],
  },
  { path: '**', redirectTo: '' },
];
</code></pre>

<hr>

<h2 id="autenticación">Autenticación</h2>

<h3>Flujo</h3>

<ol>
  <li>El usuario envía sus credenciales en <code>/login</code>.</li>
  <li><code>AuthService</code> llama a <code>POST /api/auth/signin</code>.</li>
  <li>El backend responde con <code>accessToken</code> y datos del usuario.</li>
  <li>El token y el usuario se guardan en <code>localStorage</code>.</li>
  <li>El <code>authInterceptor</code> inyecta el token en cada request posterior.</li>
  <li>Los guards verifican autenticación y rol antes de permitir la navegación.</li>
</ol>

<h3>AuthService</h3>

<p>Servicio central de autenticación. Métodos principales:</p>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>signin(dto)</code></td><td>Llama al endpoint <code>/auth/signin</code></td></tr>
    <tr><td><code>signup(dto)</code></td><td>Llama al endpoint <code>/auth/signup</code></td></tr>
    <tr><td><code>logout()</code></td><td>Elimina token y usuario de <code>localStorage</code></td></tr>
    <tr><td><code>getToken()</code></td><td>Devuelve el token actual</td></tr>
    <tr><td><code>isAuthenticated()</code></td><td>Indica si hay sesión activa</td></tr>
    <tr><td><code>isAdmin()</code></td><td>Indica si el usuario es ADMIN</td></tr>
    <tr><td><code>isEstudiante()</code></td><td>Indica si el usuario es ESTUDIANTE</td></tr>
  </tbody>
</table>

<h3>Almacenamiento de sesión</h3>

<table>
  <thead>
    <tr>
      <th>Clave en localStorage</th>
      <th>Contenido</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>auth_token</code></td><td>JWT devuelto por el backend</td></tr>
    <tr><td><code>auth_user</code></td><td>JSON del usuario autenticado</td></tr>
  </tbody>
</table>

<hr>

<h2 id="guards">Guards</h2>

<p>Guards funcionales (Angular 17) que protegen rutas según autenticación y rol.</p>

<table>
  <thead>
    <tr>
      <th>Guard</th>
      <th>Comportamiento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authGuard</code></td>
      <td>Si no hay sesión, redirige a <code>/login</code>.</td>
    </tr>
    <tr>
      <td><code>adminGuard</code></td>
      <td>Si el usuario no es ADMIN, redirige a <code>/mis-cursos</code>.</td>
    </tr>
    <tr>
      <td><code>estudianteGuard</code></td>
      <td>Si el usuario no es ESTUDIANTE, redirige a <code>/estudiantes</code>.</td>
    </tr>
  </tbody>
</table>

<h3>Ejemplo: authGuard</h3>

<pre><code>export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
</code></pre>

<hr>

<h2 id="interceptor-http">Interceptor HTTP</h2>

<p>
  El <code>authInterceptor</code> intercepta cada request HTTP y:
</p>

<ul>
  <li>Inyecta automáticamente el header <code>Authorization: Bearer &lt;token&gt;</code> si hay sesión.</li>
  <li>Captura errores <b>401 Unauthorized</b> y redirige al login, cerrando la sesión.</li>
</ul>

<h3>Ejemplo</h3>

<pre><code>export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
</code></pre>

<h3>Registro en app.config.ts</h3>

<pre><code>export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
</code></pre>

<hr>

<h2 id="servicios">Servicios</h2>

<table>
  <thead>
    <tr>
      <th>Servicio</th>
      <th>Responsabilidad</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>AuthService</code></td>
      <td>Autenticación, sesión, roles.</td>
    </tr>
    <tr>
      <td><code>EstudiantesService</code></td>
      <td>CRUD de estudiantes.</td>
    </tr>
    <tr>
      <td><code>CursosService</code></td>
      <td>CRUD de cursos.</td>
    </tr>
    <tr>
      <td><code>AsignacionesService</code></td>
      <td>Asignar/quitar cursos y consultar mis cursos.</td>
    </tr>
    <tr>
      <td><code>ToastService</code></td>
      <td>Notificaciones con SweetAlert2 (success, error, confirm).</td>
    </tr>
  </tbody>
</table>

<h3>Ejemplo: CursosService</h3>

<pre><code>@Injectable({ providedIn: 'root' })
export class CursosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/cursos`;

  findAll(): Observable&lt;Curso[]&gt; {
    return this.http.get&lt;Curso[]&gt;(this.apiUrl);
  }

  create(dto: CreateCursoDto): Observable&lt;Curso&gt; {
    return this.http.post&lt;Curso&gt;(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateCursoDto): Observable&lt;Curso&gt; {
    return this.http.patch&lt;Curso&gt;(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: string): Observable&lt;{ message: string }&gt; {
    return this.http.delete&lt;{ message: string }&gt;(`${this.apiUrl}/${id}`);
  }
}
</code></pre>

<h3>Ejemplo: ToastService</h3>

<pre><code>@Injectable({ providedIn: 'root' })
export class ToastService {
  success(title: string, text?: string): void {
    Swal.fire({ icon: 'success', title, text, timer: 1800, showConfirmButton: false });
  }

  error(title: string, text?: string): void {
    Swal.fire({ icon: 'error', title, text });
  }

  async confirm(title: string, text: string): Promise&lt;boolean&gt; {
    const result = await Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
    });
    return result.isConfirmed;
  }
}
</code></pre>

<hr>

<h2 id="modelos">Modelos</h2>

<p>Interfaces TypeScript que tipan las respuestas de la API.</p>

<table>
  <thead>
    <tr>
      <th>Modelo</th>
      <th>Propósito</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>Usuario</code></td><td>Datos del usuario autenticado</td></tr>
    <tr><td><code>AuthResponse</code></td><td>Respuesta de login/signup</td></tr>
    <tr><td><code>Estudiante</code></td><td>Datos de estudiante</td></tr>
    <tr><td><code>EstudianteConCursos</code></td><td>Estudiante con cursos asignados</td></tr>
    <tr><td><code>Curso</code></td><td>Curso con catedráticos</td></tr>
    <tr><td><code>CatedraticoSimple</code></td><td>Catedrático dentro de un curso</td></tr>
    <tr><td><code>CreateEstudianteDto</code></td><td>Payload para crear estudiante</td></tr>
    <tr><td><code>CreateCursoDto</code></td><td>Payload para crear curso</td></tr>
    <tr><td><code>CreateAsignacionDto</code></td><td>Payload para asignar curso</td></tr>
  </tbody>
</table>

<h3>Ejemplo</h3>

<pre><code>export interface Estudiante {
  idEstudiante: string;
  nombre: string;
  apellido: string;
  nivel: string;
  grado: string;
  idCarrera: string;
  seccion: string;
  cursosAsignados?: CursoAsignadoSimple[];
}

export interface CursoAsignadoSimple {
  idCurso: string;
  nombreCurso: string;
}
</code></pre>

<hr>

<h2 id="componentes">Componentes</h2>

<table>
  <thead>
    <tr>
      <th>Componente</th>
      <th>Ruta</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>LoginComponent</code></td><td><code>/login</code></td><td>Formulario de inicio de sesión</td></tr>
    <tr><td><code>SignupComponent</code></td><td><code>/signup</code></td><td>Formulario de registro con rol</td></tr>
    <tr><td><code>LayoutComponent</code></td><td>—</td><td>Contenedor con navbar y router-outlet</td></tr>
    <tr><td><code>NavbarComponent</code></td><td>—</td><td>Barra superior con links según rol</td></tr>
    <tr><td><code>EstudiantesComponent</code></td><td><code>/estudiantes</code></td><td>Tabla + modal para CRUD de estudiantes</td></tr>
    <tr><td><code>CursosComponent</code></td><td><code>/cursos</code></td><td>Tabla + modal para CRUD de cursos (con catedráticos)</td></tr>
    <tr><td><code>AsignacionesComponent</code></td><td><code>/asignaciones</code></td><td>Selector de estudiante + asignación de cursos</td></tr>
    <tr><td><code>MisCursosComponent</code></td><td><code>/mis-cursos</code></td><td>Vista del estudiante con sus cursos asignados</td></tr>
  </tbody>
</table>

<h3>Patrones usados en componentes</h3>

<ul>
  <li><b>Reactive Forms</b> con validaciones síncronas.</li>
  <li><b>Standalone components</b>: sin NgModules.</li>
  <li><b>Inyección con <code>inject()</code></b> en lugar de constructor cuando aplica.</li>
  <li><b>Change Detection</b> basada en eventos con <code>eventCoalescing</code>.</li>
  <li><b>Modales propios</b> sin librerías externas.</li>
</ul>

<hr>

<h2 id="manejo-de-errores">Manejo de Errores</h2>

<p>
  Todos los errores del backend se capturan en los servicios y se muestran al
  usuario mediante <code>ToastService</code> con mensajes claros.
</p>

<h3>Formato de error del backend</h3>

<pre><code>{
  "statusCode": 400,
  "timestamp": "2024-06-15T10:30:00.000Z",
  "path": "/api/estudiantes",
  "message": "El id del estudiante es obligatorio"
}
</code></pre>

<h3>Extracción del mensaje</h3>

<p>El método <code>extractErrorMessage</code> del <code>ToastService</code> normaliza el mensaje:</p>

<ul>
  <li>Si el mensaje es un <b>string</b>, lo devuelve directamente.</li>
  <li>Si es un <b>array</b>, lo une con comas.</li>
  <li>Si no hay mensaje, usa un <b>fallback</b>.</li>
</ul>

<h3>Errores comunes mostrados al usuario</h3>

<table>
  <thead>
    <tr>
      <th>Situación</th>
      <th>Mensaje mostrado</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Credenciales incorrectas</td><td>"Credenciales inválidas"</td></tr>
    <tr><td>Email duplicado al registrarse</td><td>"El email ya está registrado"</td></tr>
    <tr><td>Asignación duplicada</td><td>"El estudiante ya tiene ese curso asignado"</td></tr>
    <tr><td>Estudiante no encontrado</td><td>"Estudiante con id X no encontrado"</td></tr>
    <tr><td>Token expirado</td><td>Redirección automática al login</td></tr>
    <tr><td>Sin permisos</td><td>"No tienes permisos para acceder a este recurso"</td></tr>
  </tbody>
</table>

<hr>

<h2 id="diseño-y-experiencia-de-usuario">Diseño y Experiencia de Usuario</h2>

<h3>Principios de diseño</h3>

<ul>
  <li><b>Interfaz limpia</b>: colores neutros con acentos en azul (#3b82f6).</li>
  <li><b>Feedback inmediato</b>: notificaciones con SweetAlert2 para cada acción.</li>
  <li><b>Estados de carga</b>: indicadores "Cargando..." y botones deshabilitados mientras se procesa.</li>
  <li><b>Responsive</b>: layout adaptable a distintos tamaños.</li>
  <li><b>Navegación clara</b>: navbar con links activos resaltados.</li>
  <li><b>Modales accesibles</b>: cierre con tecla Escape o clic en backdrop.</li>
</ul>

<h3>Componentes visuales clave</h3>

<table>
  <thead>
    <tr>
      <th>Elemento</th>
      <th>Uso</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Tarjetas (cards)</td><td>Agrupan tablas y formularios</td></tr>
    <tr><td>Tablas</td><td>Listados con hover y bordes suaves</td></tr>
    <tr><td>Modales</td><td>Formularios de crear/editar</td></tr>
    <tr><td>Chips</td><td>Mostrar catedráticos en cursos</td></tr>
    <tr><td>Badges</td><td>Mostrar metadatos del estudiante</td></tr>
    <tr><td>Gradientes</td><td>Pantallas de login/signup y perfil</td></tr>
  </tbody>
</table>

<hr>

<h2 id="buenas-prácticas">Buenas Prácticas</h2>

<h3>Principios SOLID</h3>

<ul>
  <li><b>S</b> — Cada servicio tiene una única responsabilidad.</li>
  <li><b>O</b> — Los guards y servicios se pueden extender sin modificar otros.</li>
  <li><b>L</b> — Los guards funcionales son intercambiables.</li>
  <li><b>I</b> — Interfaces específicas por dominio.</li>
  <li><b>D</b> — Inyección de dependencias vía <code>inject()</code>.</li>
</ul>

<h3>Clean Code</h3>

<ul>
  <li>Nombres descriptivos en componentes, servicios y variables.</li>
  <li>Funciones cortas con una única tarea.</li>
  <li>Estructura por dominio (<code>core/</code>, <code>shared/</code>, <code>features/</code>).</li>
  <li>Sin código duplicado (DRY).</li>
  <li>Uso de barrels (<code>index.ts</code>) para imports limpios.</li>
</ul>

<h3>Angular</h3>

<ul>
  <li><b>Standalone components</b> sin NgModules.</li>
  <li><b>Lazy loading</b> de rutas con <code>loadComponent</code>.</li>
  <li><b>Reactive Forms</b> con validaciones.</li>
  <li><b>Guards funcionales</b> (<code>CanActivateFn</code>).</li>
  <li><b>Interceptors funcionales</b> (<code>HttpInterceptorFn</code>).</li>
  <li>Uso de <b>RxJS</b> para flujos asíncronos.</li>
  <li>Separación estricta entre servicios y componentes.</li>
</ul>

<h3>UI / UX</h3>

<ul>
  <li>Notificaciones consistentes con SweetAlert2.</li>
  <li>Confirmación antes de acciones destructivas.</li>
  <li>Bloqueo de botones durante operaciones en curso.</li>
  <li>Estados de carga visibles para el usuario.</li>
  <li>Manejo de errores con mensajes claros.</li>
</ul>

<hr>

<p align="center">
  <sub>Documentación del frontend — Prueba técnica</sub>
</p>
