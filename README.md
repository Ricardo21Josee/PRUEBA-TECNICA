<h1 align="center">
  <b>Prueba Técnica - Sistema de Gestión Académica</b>
</h1>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=3498DB&center=true&vCenter=true&width=600&lines=Full+Stack+Application;NestJS+%2B+Angular+%2B+MySQL;JWT+Authentication+with+Roles;CRUD+%2B+Relaciones+N%3AM" alt="Typing SVG">
</div>

<br>

<div align="center">

  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/MySQL-8+-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">

</div>

<br>

<hr>

<h2>Tabla de Contenidos</h2>

<ul>
  <li><a href="#descripción-general">Descripción General</a></li>
  <li><a href="#stack-tecnológico">Stack Tecnológico</a></li>
  <li><a href="#arquitectura-del-sistema">Arquitectura del Sistema</a></li>
  <li><a href="#estructura-del-repositorio">Estructura del Repositorio</a></li>
  <li><a href="#modelo-de-base-de-datos">Modelo de Base de Datos</a></li>
  <li><a href="#roles-y-permisos">Roles y Permisos</a></li>
  <li><a href="#requisitos-previos">Requisitos Previos</a></li>
  <li><a href="#instalación-y-ejecución">Instalación y Ejecución</a></li>
  <li><a href="#endpoints-de-la-api">Endpoints de la API</a></li>
  <li><a href="#ejemplos-de-uso">Ejemplos de Uso</a></li>
  <li><a href="#capturas-de-pantalla">Capturas de Pantalla</a></li>
  <li><a href="#colección-de-postman">Colección de Postman</a></li>
  <li><a href="#decisiones-técnicas">Decisiones Técnicas</a></li>
  <li><a href="#buenas-prácticas-aplicadas">Buenas Prácticas Aplicadas</a></li>
  <li><a href="#autor">Autor</a></li>
</ul>

<hr>

<h2 id="descripción-general">Descripción General</h2>

<p>
  Aplicación web <b>Full Stack</b> que simula un sistema de gestión académica universitaria
  para la administración de <b>estudiantes</b> y <b>cursos</b>, con gestión de asignaciones
  mediante una <b>relación intermedia N:M</b> en base de datos.
</p>

<p>
  El sistema implementa autenticación con <b>JWT</b> y segmenta el acceso en dos roles:
</p>

<ul>
  <li><b>Administrador</b>: gestiona estudiantes, cursos y asignaciones.</li>
  <li><b>Estudiante</b>: consulta únicamente los cursos que tiene asignados.</li>
</ul>

<p>
  El proyecto fue desarrollado como prueba técnica para el área de <b>Desarrollo 4D</b>,
  siguiendo principios <b>SOLID</b>, <b>Clean Code</b> y <b>REST</b>.
</p>

<hr>

<h2 id="stack-tecnológico">Stack Tecnológico</h2>

<h3>Backend</h3>

<table>
  <thead>
    <tr>
      <th>Tecnología</th>
      <th>Versión</th>
      <th>Propósito</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>NestJS</td><td>10</td><td>Framework principal del backend</td></tr>
    <tr><td>TypeORM</td><td>0.3</td><td>ORM para MySQL</td></tr>
    <tr><td>MySQL</td><td>8+</td><td>Base de datos relacional</td></tr>
    <tr><td>Passport + JWT</td><td>—</td><td>Autenticación stateless</td></tr>
    <tr><td>bcrypt</td><td>—</td><td>Hashing de contraseñas</td></tr>
    <tr><td>class-validator</td><td>—</td><td>Validación de DTOs</td></tr>
  </tbody>
</table>

<h3>Frontend</h3>

<table>
  <thead>
    <tr>
      <th>Tecnología</th>
      <th>Versión</th>
      <th>Propósito</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Angular</td><td>17</td><td>Framework SPA (standalone components)</td></tr>
    <tr><td>TypeScript</td><td>5</td><td>Lenguaje principal</td></tr>
    <tr><td>RxJS</td><td>—</td><td>Programación reactiva</td></tr>
    <tr><td>SweetAlert2</td><td>—</td><td>Notificaciones UI</td></tr>
    <tr><td>CSS puro</td><td>—</td><td>Estilos sin dependencias</td></tr>
  </tbody>
</table>

<h3>Base de Datos</h3>

<table>
  <thead>
    <tr>
      <th>Tecnología</th>
      <th>Versión</th>
      <th>Propósito</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>MySQL</td><td>8+</td><td>Motor relacional</td></tr>
    <tr><td>MySQL Workbench</td><td>—</td><td>Cliente de administración</td></tr>
  </tbody>
</table>

<hr>

<h2 id="arquitectura-del-sistema">Arquitectura del Sistema</h2>

<pre>
┌─────────────────────────────────────────────────────────────┐
│                       NAVEGADOR WEB                         │
│                    (Angular 17 + TS)                        │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP / JSON
                            │ Authorization: Bearer &lt;JWT&gt;
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API REST (NestJS)                       │
│  ┌────────────┬────────────┬────────────┬───────────────┐   │
│  │   Auth     │ Estudiantes│   Cursos   │ Asignaciones  │   │
│  └────────────┴────────────┴────────────┴───────────────┘   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Guards (JWT + Roles) · Pipes · Filters             │    │
│  └─────────────────────────────────────────────────────┘    │
└───────────────────────────┬─────────────────────────────────┘
                            │ TypeORM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     MySQL 8 (GestionAcademica)              │
│   Estudiante · Curso · CursoEstudiante · Usuario · ...      │
└─────────────────────────────────────────────────────────────┘
</pre>

<hr>

<h2 id="estructura-del-repositorio">Estructura del Repositorio</h2>

<pre>
PRUEBA-TECNICA/
│
├── backend/                            # API REST (NestJS)
│   ├── src/
│   │   ├── auth/                       # Login y JWT
│   │   ├── usuarios/                   # Usuarios y roles
│   │   ├── estudiantes/                # CRUD estudiantes
│   │   ├── cursos/                     # CRUD cursos
│   │   ├── asignaciones/               # Relación N:M
│   │   ├── common/                     # Guards, filtros, decoradores
│   │   └── config/                     # Configuración
│   ├── .env.example
│   └── README.md                       # Documentación del backend
│
├── frontend/                           # SPA (Angular 17)
│   ├── src/
│   │   └── app/
│   │       ├── core/                   # Servicios, guards, interceptors
│   │       ├── shared/                 # Componentes reutilizables
│   │       └── features/               # Módulos funcionales
│   └── README.md                       # Documentación del frontend
│
├── database/                           # Scripts SQL
│   ├── 01_schema.sql                   # Creación de tablas
│   ├── 02_seed.sql                     # Datos de prueba
│   ├── 03_queries_verificacion.sql     # Queries de verificación
│   └── README.md                       # Documentación de la BD
│
├── docs/
│   ├── postman_collection.json         # Colección Postman
│   └── screenshots/                    # Capturas de pantalla
│
└── README.md                           # Este archivo
</pre>

<hr>

<h2 id="modelo-de-base-de-datos">Modelo de Base de Datos</h2>

<p>
  Diseño <b>normalizado hasta 3FN</b>, con catálogos separados y tablas intermedias
  para las relaciones <b>N:M</b>.
</p>

<h3>Tablas</h3>

<table>
  <thead>
    <tr>
      <th>Tabla</th>
      <th>Tipo</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>Facultad</code></td><td>Catálogo</td><td>Facultades universitarias</td></tr>
    <tr><td><code>Carrera</code></td><td>Catálogo</td><td>Carreras (FK → Facultad)</td></tr>
    <tr><td><code>Catedratico</code></td><td>Catálogo</td><td>Docentes</td></tr>
    <tr><td><code>Curso</code></td><td>Entidad</td><td>Cursos (FK → Carrera)</td></tr>
    <tr><td><code>CursoCatedratico</code></td><td>Intermedia N:M</td><td>Curso ↔ Catedrático</td></tr>
    <tr><td><code>Estudiante</code></td><td>Entidad</td><td>Estudiantes (FK → Carrera)</td></tr>
    <tr><td><code>CursoEstudiante</code></td><td><b>Intermedia N:M (T3)</b></td><td>Estudiante ↔ Curso</td></tr>
    <tr><td><code>Usuario</code></td><td>Autenticación</td><td>Roles ADMIN / ESTUDIANTE</td></tr>
  </tbody>
</table>

<h3>Diagrama Entidad-Relación</h3>

<pre>
Facultad ──&lt; Carrera ──┬──&lt; Curso ──&lt; CursoCatedratico &gt;── Catedratico
                       │                  │
                       │                  │
                       └──&lt; Estudiante ───┴─&lt; CursoEstudiante &gt;
                                              │
                                              └─&lt; Usuario &gt;
</pre>

<p>Diagrama visual completo en <code>database/README.md</code>.</p>

<hr>

<h2 id="roles-y-permisos">Roles y Permisos</h2>

<table>
  <thead>
    <tr>
      <th>Acción</th>
      <th>ADMIN</th>
      <th>ESTUDIANTE</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Iniciar sesión</td><td>Sí</td><td>Sí</td></tr>
    <tr><td>Crear cuenta</td><td>Sí</td><td>Sí</td></tr>
    <tr><td>Listar estudiantes</td><td>Sí</td><td>No</td></tr>
    <tr><td>Crear / editar / eliminar estudiantes</td><td>Sí</td><td>No</td></tr>
    <tr><td>Listar cursos</td><td>Sí</td><td>No</td></tr>
    <tr><td>Crear / editar / eliminar cursos</td><td>Sí</td><td>No</td></tr>
    <tr><td>Asignar cursos a estudiantes</td><td>Sí</td><td>No</td></tr>
    <tr><td>Ver sus propios cursos</td><td>No</td><td>Sí</td></tr>
  </tbody>
</table>

<hr>

<h2 id="requisitos-previos">Requisitos Previos</h2>

<ul>
  <li><b>Node.js</b> 18 o superior</li>
  <li><b>npm</b> 9 o superior</li>
  <li><b>MySQL</b> 8 o superior</li>
  <li><b>MySQL Workbench</b> (o cliente SQL equivalente)</li>
  <li><b>Angular CLI</b> 17 (<code>npm install -g @angular/cli@17</code>)</li>
  <li><b>Postman</b> (opcional, para probar los endpoints)</li>
</ul>

<hr>

<h2 id="instalación-y-ejecución">Instalación y Ejecución</h2>

<h3>1. Clonar el repositorio</h3>

<pre><code>git clone https://github.com/Ricardo21Josee/PRUEBA-TECNICA.git
cd PRUEBA-TECNICA
</code></pre>

<h3>2. Configurar la base de datos</h3>

<p>Abrir <b>MySQL Workbench</b> y ejecutar en orden:</p>

<pre><code>database/01_schema.sql
database/02_seed.sql
</code></pre>

<p>Esto crea la base <code>GestionAcademica</code> con todas sus tablas y datos de prueba.</p>

<h3>3. Backend</h3>

<pre><code>cd backend
npm install
</code></pre>

<p>Crear el archivo <code>.env</code> en <code>backend/</code> basado en <code>.env.example</code>:</p>

<pre><code>PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_aqui
DB_NAME=GestionAcademica
JWT_SECRET=clave_secreta_cambiar
JWT_EXPIRES_IN=8h
</code></pre>

<p>Arrancar el servidor:</p>

<pre><code>npm run start:dev
</code></pre>

<p>La API estará disponible en:</p>

<pre><code>http://localhost:3000/api
</code></pre>

<h3>4. Frontend</h3>

<pre><code>cd frontend
npm install
npm start
</code></pre>

<p>La aplicación estará disponible en:</p>

<pre><code>http://localhost:4200
</code></pre>

<h3>5. Credenciales de prueba</h3>

<table>
  <thead>
    <tr>
      <th>Rol</th>
      <th>Email</th>
      <th>Contraseña</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Administrador</td><td><code>admin@uni.edu</code></td><td><code>Admin123*</code></td></tr>
    <tr><td>Estudiante</td><td><code>2024001@uni.edu</code></td><td><code>Estudiante123*</code></td></tr>
    <tr><td>Estudiante</td><td><code>2024002@uni.edu</code></td><td><code>Estudiante123*</code></td></tr>
  </tbody>
</table>

<blockquote>
  Las contraseñas se almacenan hasheadas con <b>bcrypt</b>. El backend genera los hashes
  automáticamente en el primer arranque mediante un <code>SeederService</code>.
</blockquote>

<hr>

<h2 id="endpoints-de-la-api">Endpoints de la API</h2>

<p><b>Base URL:</b> <code>http://localhost:3000/api</code></p>

<h3>Autenticación</h3>

<table>
  <thead>
    <tr><th>Método</th><th>Endpoint</th><th>Rol</th><th>Descripción</th></tr>
  </thead>
  <tbody>
    <tr><td><code>POST</code></td><td><code>/auth/signin</code></td><td>Público</td><td>Iniciar sesión, devuelve JWT</td></tr>
    <tr><td><code>POST</code></td><td><code>/auth/signup</code></td><td>Público</td><td>Registrar nuevo usuario</td></tr>
  </tbody>
</table>

<h3>Estudiantes</h3>

<table>
  <thead>
    <tr><th>Método</th><th>Endpoint</th><th>Rol</th><th>Descripción</th></tr>
  </thead>
  <tbody>
    <tr><td><code>GET</code></td><td><code>/estudiantes</code></td><td>ADMIN</td><td>Listar estudiantes</td></tr>
    <tr><td><code>GET</code></td><td><code>/estudiantes/:id</code></td><td>ADMIN</td><td>Estudiante con sus cursos</td></tr>
    <tr><td><code>POST</code></td><td><code>/estudiantes</code></td><td>ADMIN</td><td>Crear estudiante</td></tr>
    <tr><td><code>PATCH</code></td><td><code>/estudiantes/:id</code></td><td>ADMIN</td><td>Actualizar estudiante</td></tr>
    <tr><td><code>DELETE</code></td><td><code>/estudiantes/:id</code></td><td>ADMIN</td><td>Eliminar estudiante</td></tr>
  </tbody>
</table>

<h3>Cursos</h3>

<table>
  <thead>
    <tr><th>Método</th><th>Endpoint</th><th>Rol</th><th>Descripción</th></tr>
  </thead>
  <tbody>
    <tr><td><code>GET</code></td><td><code>/cursos</code></td><td>ADMIN</td><td>Listar cursos con catedráticos</td></tr>
    <tr><td><code>GET</code></td><td><code>/cursos/:id</code></td><td>ADMIN</td><td>Detalle de un curso</td></tr>
    <tr><td><code>POST</code></td><td><code>/cursos</code></td><td>ADMIN</td><td>Crear curso</td></tr>
    <tr><td><code>PATCH</code></td><td><code>/cursos/:id</code></td><td>ADMIN</td><td>Actualizar curso</td></tr>
    <tr><td><code>DELETE</code></td><td><code>/cursos/:id</code></td><td>ADMIN</td><td>Eliminar curso</td></tr>
  </tbody>
</table>

<h3>Asignaciones</h3>

<table>
  <thead>
    <tr><th>Método</th><th>Endpoint</th><th>Rol</th><th>Descripción</th></tr>
  </thead>
  <tbody>
    <tr><td><code>POST</code></td><td><code>/asignaciones</code></td><td>ADMIN</td><td>Asignar curso a estudiante</td></tr>
    <tr><td><code>DELETE</code></td><td><code>/asignaciones/:idEstudiante/:idCurso</code></td><td>ADMIN</td><td>Quitar asignación</td></tr>
    <tr><td><code>GET</code></td><td><code>/asignaciones/mis-cursos</code></td><td>ESTUDIANTE</td><td>Ver sus propios cursos</td></tr>
  </tbody>
</table>

<hr>

<h2 id="ejemplos-de-uso">Ejemplos de Uso</h2>

<h3>1. Iniciar sesión</h3>

<p><b>Request</b></p>

<pre><code>POST http://localhost:3000/api/auth/signin
Content-Type: application/json

{
  "email": "admin@uni.edu",
  "password": "Admin123*"
}
</code></pre>

<p><b>Response</b></p>

<pre><code>{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "idUsuario": 1,
    "email": "admin@uni.edu",
    "rol": "ADMIN",
    "idEstudiante": null
  }
}
</code></pre>

<h3>2. Listar estudiantes</h3>

<p><b>Request</b></p>

<pre><code>GET http://localhost:3000/api/estudiantes
Authorization: Bearer &lt;accessToken&gt;
</code></pre>

<p><b>Response</b></p>

<pre><code>[
  {
    "idEstudiante": "2024001",
    "nombre": "Ana",
    "apellido": "Ramírez",
    "nivel": "Universitario",
    "grado": "1er",
    "idCarrera": "INGSIS",
    "seccion": "A"
  }
]
</code></pre>

<h3>3. Obtener estudiante con cursos asignados</h3>

<p><b>Request</b></p>

<pre><code>GET http://localhost:3000/api/estudiantes/2024001
Authorization: Bearer &lt;accessToken&gt;
</code></pre>

<p><b>Response</b></p>

<pre><code>{
  "idEstudiante": "2024001",
  "nombre": "Ana",
  "apellido": "Ramírez",
  "nivel": "Universitario",
  "grado": "1er",
  "idCarrera": "INGSIS",
  "seccion": "A",
  "cursosAsignados": [
    { "idCurso": "MAT101", "nombreCurso": "Matemática Básica" },
    { "idCurso": "PROG201", "nombreCurso": "Programación I" }
  ]
}
</code></pre>

<h3>4. Crear curso con catedráticos</h3>

<p><b>Request</b></p>

<pre><code>POST http://localhost:3000/api/cursos
Authorization: Bearer &lt;accessToken&gt;
Content-Type: application/json

{
  "idCurso": "TEST01",
  "nombreCurso": "Curso de Prueba",
  "idGrado": "1ER",
  "idCarrera": "INGSIS",
  "creditos": 3,
  "catedratico": [
    {
      "idCatedratico": "OGARCIA",
      "nombreCatedratico": "Oscar García"
    }
  ]
}
</code></pre>

<h3>5. Asignar curso a estudiante</h3>

<p><b>Request</b></p>

<pre><code>POST http://localhost:3000/api/asignaciones
Authorization: Bearer &lt;accessToken&gt;
Content-Type: application/json

{
  "idEstudiante": "2024001",
  "idCurso": "FIS101"
}
</code></pre>

<p><b>Response</b></p>

<pre><code>{
  "message": "Curso asignado correctamente",
  "asignacion": {
    "idEstudiante": "2024001",
    "idCurso": "FIS101"
  }
}
</code></pre>

<h3>6. Ver mis cursos (rol ESTUDIANTE)</h3>

<p><b>Request</b></p>

<pre><code>GET http://localhost:3000/api/asignaciones/mis-cursos
Authorization: Bearer &lt;studentToken&gt;
</code></pre>

<p><b>Response</b></p>

<pre><code>{
  "idEstudiante": "2024001",
  "nombre": "Ana",
  "apellido": "Ramírez",
  "nivel": "Universitario",
  "grado": "1er",
  "idCarrera": "INGSIS",
  "seccion": "A",
  "cursosAsignados": [
    { "idCurso": "MAT101", "nombreCurso": "Matemática Básica" }
  ]
}
</code></pre>

<hr>

<h2 id="capturas-de-pantalla">Capturas de Pantalla</h2>

<blockquote>
  Guardar todas las imágenes en <code>docs/screenshots/</code> con los nombres indicados.
</blockquote>

<h3>Pantalla de Login</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/1.png" alt="Login" width="800"/>
</p>

<h3>Panel de Estudiantes (Administrador)</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/2.png" alt="Estudiantes" width="800"/>
</p>

<h3>Crear / Editar Estudiante (Modal)</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/3.png" alt="Modal Estudiante" width="800"/>
  <img src="docs/capturas-de-pantalla/4.png" alt="Modal Estudiante" width="800"/>
</p>

<h3>Panel de Cursos (Administrador)</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/5.png" alt="Cursos" width="800"/>
</p>

<h3>Crear / Editar Curso (Modal)</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/6.png" alt="Modal Curso" width="800"/>
</p>

<h3>Asignación de Cursos</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/7.png" alt="Asignaciones" width="800"/>
</p>

<h3>Vista de Estudiante - Mis Cursos</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/8.png" alt="Mis Cursos" width="800"/>
</p>

<h3>Crear Cuenta (Sign-up)</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/9.png" alt="Signup" width="800"/>
</p>

<h3>Postman - Colección</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/10.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/11.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/12.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/13.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/14.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/15.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/16.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/17.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/18.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/19.png" alt="Postman" width="800"/>
  <img src="docs/capturas-de-pantalla/20.png" alt="Postman" width="800"/>
</p>

<h3>Postman - Signin exitoso</h3>

<p align="center">
  <img src="docs/capturas-de-pantalla/21.png" alt="Postman Signin" width="800"/>
  <img src="docs/capturas-de-pantalla/22.png" alt="Postman Signin" width="800"/>
</p>

<hr>

<h2 id="colección-de-postman">Colección de Postman</h2>

<p>
  El archivo <code>docs/postman_collection.json</code> contiene <b>todos los endpoints</b>
  listos para importar en Postman.
</p>

<p><b>Importar:</b></p>

<ol>
  <li>Abrir Postman</li>
  <li><code>File</code> → <code>Import</code></li>
  <li>Seleccionar <code>docs/postman_collection.json</code></li>
  <li>Ejecutar <code>Signin Admin</code> primero (guarda el token automáticamente)</li>
  <li>Ejecutar el resto de requests</li>
</ol>

<hr>

<h2 id="decisiones-técnicas">Decisiones Técnicas</h2>

<h3>Base de datos</h3>

<ul>
  <li><b>Normalización 3FN</b>: catálogos separados (<code>Facultad</code>, <code>Carrera</code>, <code>Catedratico</code>) para evitar redundancia y dependencias transitivas.</li>
  <li><b>Tabla intermedia N:M</b>: <code>CursoEstudiante</code> implementa la relación entre estudiantes y cursos como pide la prueba (T3).</li>
  <li><b>Segunda intermedia N:M</b>: <code>CursoCatedratico</code> permite que un curso tenga varios catedráticos.</li>
  <li><b>PKs naturales</b>: se usan IDs como <code>2024001</code>, <code>MAT101</code>, <code>OGARCIA</code> para reflejar los ejemplos del enunciado.</li>
</ul>

<h3>Backend</h3>

<ul>
  <li><b>Autenticación JWT stateless</b> con expiración configurable (8h).</li>
  <li><b>bcrypt con salt rounds 10</b> para hashing de contraseñas.</li>
  <li><b>SeederService</b>: hashea las contraseñas de prueba en el primer arranque, evitando dejar hashes en los scripts SQL.</li>
  <li><b>Guards por rol</b>: <code>JwtAuthGuard</code> + <code>RolesGuard</code> protegen cada endpoint según el rol del usuario.</li>
  <li><b>ValidationPipe global</b>: valida todos los DTOs con <code>class-validator</code>.</li>
  <li><b>AllExceptionsFilter</b>: estandariza las respuestas de error con un formato JSON consistente.</li>
  <li><b>NestJS internamente usa Express</b> como servidor HTTP, cumpliendo el requisito del enunciado sobre middleware.</li>
</ul>

<h3>Frontend</h3>

<ul>
  <li><b>Standalone components</b> (Angular 17), sin NgModules.</li>
  <li><b>Lazy loading</b> de rutas para mejor rendimiento.</li>
  <li><b>Interceptor HTTP</b> que inyecta el JWT automáticamente en cada request.</li>
  <li><b>Guards funcionales</b> (<code>authGuard</code>, <code>adminGuard</code>, <code>estudianteGuard</code>) para proteger rutas según autenticación y rol.</li>
  <li><b>Servicios inyectables</b> por dominio (<code>AuthService</code>, <code>EstudiantesService</code>, <code>CursosService</code>, <code>AsignacionesService</code>, <code>ToastService</code>).</li>
  <li><b>Separación de responsabilidades</b>: <code>core/</code>, <code>shared/</code>, <code>features/</code>.</li>
</ul>

<hr>

<h2 id="buenas-prácticas-aplicadas">Buenas Prácticas Aplicadas</h2>

<h3>Principios SOLID</h3>

<ul>
  <li><b>S</b> — Single Responsibility: cada servicio y componente tiene una única responsabilidad.</li>
  <li><b>O</b> — Open/Closed: los guards y decoradores permiten extender el sistema sin modificar código existente.</li>
  <li><b>L</b> — Liskov Substitution: los guards implementan <code>CanActivate</code> de forma intercambiable.</li>
  <li><b>I</b> — Interface Segregation: DTOs específicos por operación (<code>CreateEstudianteDto</code>, <code>UpdateEstudianteDto</code>).</li>
  <li><b>D</b> — Dependency Inversion: inyección de dependencias vía constructor e <code>inject()</code> en Angular.</li>
</ul>

<h3>Clean Code</h3>

<ul>
  <li>Nombres descriptivos en variables, funciones y clases.</li>
  <li>Funciones cortas con una sola responsabilidad.</li>
  <li>Estructura modular por dominio.</li>
  <li>Sin código duplicado (DRY).</li>
  <li>Sin código muerto ni comentarios obsoletos.</li>
</ul>

<h3>Convenciones</h3>

<ul>
  <li><b>Backend</b>: módulos, controllers, services, entities, DTOs.</li>
  <li><b>Frontend</b>: <code>core/</code>, <code>shared/</code>, <code>features/</code>, <code>models/</code>, <code>services/</code>.</li>
  <li><b>Base de datos</b>: nombres en PascalCase para tablas y camelCase para columnas (consistencia con TypeORM).</li>
</ul>

<hr>

<h2>Licencia</h2>

<p>
  Este proyecto fue desarrollado exclusivamente como prueba técnica. Su uso es educativo y de evaluación.
</p>

<hr>

<h2 id="autor">Autor</h2>

<h3 align="center">Ricardo Márquez</h3>

<p align="center">
  <b>Systems Engineering Student · Full Stack Developer</b>
</p>

<p align="center">
  <a href="mailto:josemarquez21garcia@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>
  <a href="https://www.linkedin.com/in/ricardo-márquez-garcía-68ab10299">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/Ricardo21Josee">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>
