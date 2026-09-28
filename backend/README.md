<h1 align="center">
  <b>Backend — API REST NestJS</b>
</h1>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=E0234E&center=true&vCenter=true&width=600&lines=NestJS+10+REST+API;JWT+Authentication;Role-Based+Access+Control;TypeORM+%2B+MySQL" alt="Typing SVG">
</div>

<br>

<div align="center">

  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/TypeORM-0.3-FE0803?style=for-the-badge" alt="TypeORM">
  <img src="https://img.shields.io/badge/MySQL-8+-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">

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
  <li><a href="#variables-de-entorno">Variables de Entorno</a></li>
  <li><a href="#scripts-disponibles">Scripts Disponibles</a></li>
  <li><a href="#módulos">Módulos</a></li>
  <li><a href="#autenticación-y-roles">Autenticación y Roles</a></li>
  <li><a href="#endpoints">Endpoints</a></li>
  <li><a href="#dtos-y-validación">DTOs y Validación</a></li>
  <li><a href="#manejo-de-errores">Manejo de Errores</a></li>
  <li><a href="#seed-automático">Seed Automático</a></li>
  <li><a href="#entidades-typeorm">Entidades TypeORM</a></li>
  <li><a href="#buenas-prácticas">Buenas Prácticas</a></li>
</ul>

<hr>

<h2 id="descripción">Descripción</h2>

<p>
  Backend del sistema de gestión académica, construido con <b>NestJS 10</b> y
  <b>TypeORM</b> sobre <b>MySQL 8</b>. Expone una API RESTful segura mediante
  <b>autenticación JWT</b> y control de acceso basado en <b>roles</b>
  (<code>ADMIN</code> y <code>ESTUDIANTE</code>).
</p>

<p>
  Implementa <b>CRUD completo</b> para estudiantes y cursos, gestión de
  <b>asignaciones N:M</b> entre estudiantes y cursos, y validación automática
  de todos los DTOs.
</p>

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
    <tr><td>NestJS</td><td>10</td><td>Framework principal</td></tr>
    <tr><td>TypeScript</td><td>5</td><td>Lenguaje</td></tr>
    <tr><td>TypeORM</td><td>0.3</td><td>ORM</td></tr>
    <tr><td>MySQL</td><td>8+</td><td>Base de datos</td></tr>
    <tr><td>@nestjs/jwt</td><td>10</td><td>Generación de JWT</td></tr>
    <tr><td>@nestjs/passport</td><td>10</td><td>Estrategias de autenticación</td></tr>
    <tr><td>passport-jwt</td><td>—</td><td>Estrategia JWT</td></tr>
    <tr><td>bcrypt</td><td>—</td><td>Hashing de contraseñas</td></tr>
    <tr><td>class-validator</td><td>—</td><td>Validación de DTOs</td></tr>
    <tr><td>class-transformer</td><td>—</td><td>Transformación de DTOs</td></tr>
    <tr><td>@nestjs/config</td><td>3</td><td>Variables de entorno</td></tr>
  </tbody>
</table>

<hr>

<h2 id="arquitectura">Arquitectura</h2>

<p>
  El backend sigue una arquitectura <b>modular por dominio</b>, con separación
  clara de responsabilidades en cada módulo:
</p>

<pre>
Controller  →  Service  →  Repository (TypeORM)  →  MySQL
     ▲             ▲
     │             │
   DTOs        Guards / Pipes
     │             │
     └── Petición HTTP con JWT
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
    <tr>
      <td><b>Controller</b></td>
      <td>Expone rutas HTTP, valida entrada mediante DTOs, delega al service.</td>
    </tr>
    <tr>
      <td><b>Service</b></td>
      <td>Contiene la lógica de negocio, orquesta repositorios y reglas del dominio.</td>
    </tr>
    <tr>
      <td><b>Repository</b></td>
      <td>Acceso a datos vía TypeORM. Se inyecta automáticamente con <code>@InjectRepository()</code>.</td>
    </tr>
    <tr>
      <td><b>Entity</b></td>
      <td>Representación de las tablas de la base de datos.</td>
    </tr>
    <tr>
      <td><b>DTO</b></td>
      <td>Objetos de transferencia de datos con validaciones.</td>
    </tr>
    <tr>
      <td><b>Guard</b></td>
      <td>Controla el acceso a rutas según autenticación y rol.</td>
    </tr>
    <tr>
      <td><b>Pipe</b></td>
      <td>Transforma y valida la entrada antes de llegar al controller.</td>
    </tr>
    <tr>
      <td><b>Filter</b></td>
      <td>Centraliza el manejo de excepciones y respuestas de error.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2 id="estructura-del-proyecto">Estructura del Proyecto</h2>

<pre>
backend/
├── src/
│   ├── main.ts                         # Punto de entrada
│   ├── app.module.ts                   # Módulo raíz
│   │
│   ├── config/                         # Configuración
│   │
│   ├── common/                         # Código compartido
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── index.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── index.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       ├── roles.guard.ts
│   │       └── index.ts
│   │
│   ├── auth/                           # Autenticación
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   │   ├── signin.dto.ts
│   │   │   ├── signup.dto.ts
│   │   │   └── index.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   │
│   ├── usuarios/                       # Usuarios y roles
│   │   ├── usuarios.service.ts
│   │   ├── usuarios.module.ts
│   │   ├── usuarios.seed.service.ts
│   │   └── entities/
│   │       └── usuario.entity.ts
│   │
│   ├── estudiantes/                    # CRUD estudiantes
│   │   ├── estudiantes.controller.ts
│   │   ├── estudiantes.service.ts
│   │   ├── estudiantes.module.ts
│   │   ├── dto/
│   │   │   ├── create-estudiante.dto.ts
│   │   │   ├── update-estudiante.dto.ts
│   │   │   └── index.ts
│   │   └── entities/
│   │       └── estudiante.entity.ts
│   │
│   ├── cursos/                         # CRUD cursos
│   │   ├── cursos.controller.ts
│   │   ├── cursos.service.ts
│   │   ├── cursos.module.ts
│   │   ├── dto/
│   │   │   ├── create-curso.dto.ts
│   │   │   ├── update-curso.dto.ts
│   │   │   └── index.ts
│   │   └── entities/
│   │       ├── curso.entity.ts
│   │       ├── catedratico.entity.ts
│   │       └── curso-catedratico.entity.ts
│   │
│   └── asignaciones/                   # Relación N:M
│       ├── asignaciones.controller.ts
│       ├── asignaciones.service.ts
│       ├── asignaciones.module.ts
│       ├── dto/
│       │   └── create-asignacion.dto.ts
│       └── entities/
│           └── curso-estudiante.entity.ts
│
├── test/                               # Tests
├── .env                                # Variables de entorno (NO se sube)
├── .env.example                        # Ejemplo público
├── .gitignore
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
</pre>

<hr>

<h2 id="instalación">Instalación</h2>

<h3>1. Instalar dependencias</h3>

<pre><code>cd backend
npm install
</code></pre>

<h3>2. Configurar variables de entorno</h3>

<p>Crear el archivo <code>.env</code> basándose en <code>.env.example</code>.</p>

<h3>3. Ejecutar la aplicación</h3>

<pre><code># Desarrollo (con recarga automática)
npm run start:dev

# Producción
npm run build
npm run start:prod
</code></pre>

<p>La API quedará disponible en <code>http://localhost:3000/api</code>.</p>

<hr>

<h2 id="variables-de-entorno">Variables de Entorno</h2>

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Descripción</th>
      <th>Ejemplo</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>PORT</code></td><td>Puerto del servidor</td><td><code>3000</code></td></tr>
    <tr><td><code>DB_HOST</code></td><td>Host de MySQL</td><td><code>localhost</code></td></tr>
    <tr><td><code>DB_PORT</code></td><td>Puerto de MySQL</td><td><code>3306</code></td></tr>
    <tr><td><code>DB_USER</code></td><td>Usuario de MySQL</td><td><code>root</code></td></tr>
    <tr><td><code>DB_PASSWORD</code></td><td>Contraseña</td><td><code>tu_password</code></td></tr>
    <tr><td><code>DB_NAME</code></td><td>Nombre de la BD</td><td><code>GestionAcademica</code></td></tr>
    <tr><td><code>JWT_SECRET</code></td><td>Clave para firmar JWT</td><td><code>clave_secreta</code></td></tr>
    <tr><td><code>JWT_EXPIRES_IN</code></td><td>Expiración del token</td><td><code>8h</code></td></tr>
  </tbody>
</table>

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
    <tr><td><code>npm run start</code></td><td>Inicia el servidor</td></tr>
    <tr><td><code>npm run start:dev</code></td><td>Modo desarrollo con watch</td></tr>
    <tr><td><code>npm run start:debug</code></td><td>Modo debug</td></tr>
    <tr><td><code>npm run start:prod</code></td><td>Modo producción</td></tr>
    <tr><td><code>npm run build</code></td><td>Compila a JavaScript</td></tr>
    <tr><td><code>npm run lint</code></td><td>Ejecuta ESLint</td></tr>
    <tr><td><code>npm run format</code></td><td>Formatea con Prettier</td></tr>
    <tr><td><code>npm run test</code></td><td>Ejecuta tests unitarios</td></tr>
  </tbody>
</table>

<hr>

<h2 id="módulos">Módulos</h2>

<h3>AuthModule</h3>

<p>Gestiona la autenticación con JWT. Expone <code>signin</code> y <code>signup</code>.</p>

<ul>
  <li><code>AuthController</code>: endpoints <code>/auth/signin</code> y <code>/auth/signup</code>.</li>
  <li><code>AuthService</code>: valida credenciales, genera tokens.</li>
  <li><code>JwtStrategy</code>: valida el token en cada request protegido.</li>
</ul>

<h3>UsuariosModule</h3>

<p>Gestiona los usuarios del sistema y sus roles.</p>

<ul>
  <li><code>UsuariosService</code>: CRUD de usuarios.</li>
  <li><code>UsuariosSeedService</code>: hashea las contraseñas de prueba al primer arranque.</li>
</ul>

<h3>EstudiantesModule</h3>

<p>CRUD completo de estudiantes.</p>

<ul>
  <li><code>EstudiantesController</code>: rutas <code>/estudiantes</code>.</li>
  <li><code>EstudiantesService</code>: lógica de negocio y consultas con relaciones.</li>
</ul>

<h3>CursosModule</h3>

<p>CRUD completo de cursos con gestión de catedráticos.</p>

<ul>
  <li><code>CursosController</code>: rutas <code>/cursos</code>.</li>
  <li><code>CursosService</code>: crea/actualiza cursos y sus relaciones con catedráticos.</li>
</ul>

<h3>AsignacionesModule</h3>

<p>Gestión de la relación N:M entre estudiantes y cursos.</p>

<ul>
  <li><code>AsignacionesController</code>: rutas <code>/asignaciones</code>.</li>
  <li><code>AsignacionesService</code>: asigna, quita y consulta asignaciones.</li>
</ul>

<hr>

<h2 id="autenticación-y-roles">Autenticación y Roles</h2>

<h3>Flujo de autenticación</h3>

<ol>
  <li>El cliente envía credenciales a <code>POST /auth/signin</code>.</li>
  <li>El backend valida el email y compara la contraseña con bcrypt.</li>
  <li>Si es válido, genera un <b>JWT</b> firmado con <code>JWT_SECRET</code>.</li>
  <li>El cliente incluye el token en <code>Authorization: Bearer &lt;token&gt;</code>.</li>
  <li><code>JwtStrategy</code> valida el token y adjunta el usuario al request.</li>
  <li><code>RolesGuard</code> verifica que el rol del usuario esté permitido.</li>
</ol>

<h3>Payload del JWT</h3>

<pre><code>{
  "sub": 1,
  "email": "admin@uni.edu",
  "rol": "ADMIN",
  "idEstudiante": null,
  "iat": 1700000000,
  "exp": 1700028800
}
</code></pre>

<h3>Roles disponibles</h3>

<table>
  <thead>
    <tr>
      <th>Rol</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ADMIN</code></td>
      <td>Acceso total: CRUD de estudiantes, cursos y asignaciones.</td>
    </tr>
    <tr>
      <td><code>ESTUDIANTE</code></td>
      <td>Acceso limitado: solo puede ver sus propios cursos.</td>
    </tr>
  </tbody>
</table>

<h3>Guards</h3>

<table>
  <thead>
    <tr>
      <th>Guard</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>JwtAuthGuard</code></td>
      <td>Valida que el request tenga un JWT válido. Si no, retorna 401.</td>
    </tr>
    <tr>
      <td><code>RolesGuard</code></td>
      <td>Verifica que el usuario tenga uno de los roles requeridos. Si no, retorna 403.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2 id="endpoints">Endpoints</h2>

<p><b>Base URL:</b> <code>http://localhost:3000/api</code></p>

<h3>Autenticación</h3>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Ruta</th>
      <th>Rol</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>POST</code></td><td><code>/auth/signin</code></td><td>Público</td><td>Iniciar sesión</td></tr>
    <tr><td><code>POST</code></td><td><code>/auth/signup</code></td><td>Público</td><td>Registrar usuario</td></tr>
  </tbody>
</table>

<h3>Estudiantes</h3>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Ruta</th>
      <th>Rol</th>
      <th>Descripción</th>
    </tr>
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
    <tr>
      <th>Método</th>
      <th>Ruta</th>
      <th>Rol</th>
      <th>Descripción</th>
    </tr>
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
    <tr>
      <th>Método</th>
      <th>Ruta</th>
      <th>Rol</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>POST</code></td><td><code>/asignaciones</code></td><td>ADMIN</td><td>Asignar curso a estudiante</td></tr>
    <tr><td><code>DELETE</code></td><td><code>/asignaciones/:idEstudiante/:idCurso</code></td><td>ADMIN</td><td>Quitar asignación</td></tr>
    <tr><td><code>GET</code></td><td><code>/asignaciones/mis-cursos</code></td><td>ESTUDIANTE</td><td>Ver sus propios cursos</td></tr>
  </tbody>
</table>

<hr>

<h2 id="dtos-y-validación">DTOs y Validación</h2>

<p>
  Todos los endpoints validan la entrada mediante <b>DTOs</b> con
  <code>class-validator</code>. El <code>ValidationPipe</code> global está
  configurado con <code>whitelist</code> y <code>forbidNonWhitelisted</code>,
  rechazando cualquier campo no declarado.
</p>

<h3>Ejemplo: CreateEstudianteDto</h3>

<pre><code>export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  idEstudiante: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nivel: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  grado: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  idCarrera: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  seccion: string;
}
</code></pre>

<h3>Ejemplo: UpdateEstudianteDto</h3>

<pre><code>import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {}
</code></pre>

<hr>

<h2 id="manejo-de-errores">Manejo de Errores</h2>

<p>
  Los errores se manejan centralmente con el filtro global
  <code>AllExceptionsFilter</code>, que captura cualquier excepción y devuelve
  una respuesta JSON estandarizada.
</p>

<h3>Formato de error</h3>

<pre><code>{
  "statusCode": 404,
  "timestamp": "2024-06-15T10:30:00.000Z",
  "path": "/api/estudiantes/99999",
  "message": "Estudiante con id 99999 no encontrado"
}
</code></pre>

<h3>Códigos HTTP utilizados</h3>

<table>
  <thead>
    <tr>
      <th>Código</th>
      <th>Significado</th>
      <th>Cuándo</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>200</code></td><td>OK</td><td>Consulta o actualización exitosa</td></tr>
    <tr><td><code>201</code></td><td>Created</td><td>Recurso creado</td></tr>
    <tr><td><code>400</code></td><td>Bad Request</td><td>Validación fallida</td></tr>
    <tr><td><code>401</code></td><td>Unauthorized</td><td>Token faltante o inválido</td></tr>
    <tr><td><code>403</code></td><td>Forbidden</td><td>Sin permisos para el rol</td></tr>
    <tr><td><code>404</code></td><td>Not Found</td><td>Recurso inexistente</td></tr>
    <tr><td><code>409</code></td><td>Conflict</td><td>Duplicado (email, asignación)</td></tr>
    <tr><td><code>500</code></td><td>Internal Server Error</td><td>Error inesperado</td></tr>
  </tbody>
</table>

<hr>

<h2 id="seed-automático">Seed Automático</h2>

<p>
  El servicio <code>UsuariosSeedService</code> se ejecuta al arrancar la aplicación.
  Detecta los usuarios con contraseña <code>PLACEHOLDER_HASH</code> y reemplaza
  sus contraseñas por hashes <b>bcrypt</b> reales.
</p>

<h3>Contraseñas por defecto</h3>

<table>
  <thead>
    <tr>
      <th>Rol</th>
      <th>Email</th>
      <th>Contraseña</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>ADMIN</td><td><code>admin@uni.edu</code></td><td><code>Admin123*</code></td></tr>
    <tr><td>ESTUDIANTE</td><td><code>2024001@uni.edu</code></td><td><code>Estudiante123*</code></td></tr>
    <tr><td>ESTUDIANTE</td><td><code>2024002@uni.edu</code></td><td><code>Estudiante123*</code></td></tr>
  </tbody>
</table>

<p>En los logs del primer arranque se verá:</p>

<pre><code>[UsuariosSeedService] Contrasena inicializada para admin@uni.edu (rol: ADMIN)
[UsuariosSeedService] Contrasena inicializada para 2024001@uni.edu (rol: ESTUDIANTE)
[UsuariosSeedService] Contrasena inicializada para 2024002@uni.edu (rol: ESTUDIANTE)
[UsuariosSeedService] 3 contrasenas inicializadas correctamente.
</code></pre>

<hr>

<h2 id="entidades-typeorm">Entidades TypeORM</h2>

<table>
  <thead>
    <tr>
      <th>Entidad</th>
      <th>Tabla</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>Usuario</code></td><td>Usuario</td><td>Usuarios y roles</td></tr>
    <tr><td><code>Estudiante</code></td><td>Estudiante</td><td>Información de estudiantes</td></tr>
    <tr><td><code>Curso</code></td><td>Curso</td><td>Cursos</td></tr>
    <tr><td><code>Catedratico</code></td><td>Catedratico</td><td>Catedráticos</td></tr>
    <tr><td><code>CursoCatedratico</code></td><td>CursoCatedratico</td><td>Relación N:M</td></tr>
    <tr><td><code>CursoEstudiante</code></td><td>CursoEstudiante</td><td>Relación N:M (T3)</td></tr>
  </tbody>
</table>

<h3>Configuración de TypeORM</h3>

<pre><code>TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get('DB_HOST'),
    port: parseInt(config.get('DB_PORT') ?? '3306', 10),
    username: config.get('DB_USER'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_NAME'),
    entities: [Usuario, Estudiante, Curso, Catedratico, CursoCatedratico, CursoEstudiante],
    synchronize: false,
    logging: false,
  }),
}),
</code></pre>

<blockquote>
  <b>synchronize: false</b> — El esquema se crea y actualiza exclusivamente
  mediante los scripts SQL de <code>database/</code>, no automáticamente por
  TypeORM. Esto garantiza control total del esquema.
</blockquote>

<hr>

<h2 id="buenas-prácticas">Buenas Prácticas</h2>

<h3>Principios SOLID</h3>

<ul>
  <li><b>Single Responsibility</b>: cada service se encarga de un dominio.</li>
  <li><b>Open/Closed</b>: guards y decoradores permiten extender sin modificar.</li>
  <li><b>Liskov Substitution</b>: los guards implementan <code>CanActivate</code> intercambiablemente.</li>
  <li><b>Interface Segregation</b>: DTOs específicos por operación.</li>
  <li><b>Dependency Inversion</b>: inyección por constructor.</li>
</ul>

<h3>Clean Code</h3>

<ul>
  <li>Nombres descriptivos en clases, métodos y variables.</li>
  <li>Métodos con una única responsabilidad.</li>
  <li>Sin código duplicado (DRY).</li>
  <li>Estructura modular por dominio.</li>
  <li>Uso de barrels (<code>index.ts</code>) para simplificar imports.</li>
</ul>

<h3>Seguridad</h3>

<ul>
  <li>Contraseñas hasheadas con <b>bcrypt</b> (10 rondas de salt).</li>
  <li>JWT con expiración configurable (8h por defecto).</li>
  <li>Validación estricta de DTOs con <code>whitelist</code> y <code>forbidNonWhitelisted</code>.</li>
  <li>Guards por rol protegiendo cada endpoint.</li>
  <li>CORS configurado para permitir solo el origen del frontend.</li>
  <li>Variables sensibles aisladas en <code>.env</code> (nunca en el código).</li>
</ul>

<h3>REST</h3>

<ul>
  <li>Uso correcto de verbos HTTP (<code>GET</code>, <code>POST</code>, <code>PATCH</code>, <code>DELETE</code>).</li>
  <li>Rutas semánticas y en plural (<code>/estudiantes</code>, <code>/cursos</code>).</li>
  <li>Códigos de estado HTTP apropiados.</li>
  <li>Respuestas JSON estandarizadas.</li>
</ul>

<hr>

<p align="center">
  <sub>Documentación del backend — Prueba técnica</sub>
</p>
