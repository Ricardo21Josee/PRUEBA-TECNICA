<h1 align="center">
  <b>Base de Datos — GestionAcademica</b>
</h1>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=4479A1&center=true&vCenter=true&width=600&lines=MySQL+8+Database;Normalized+to+3NF;N%3AM+Relations+with+Junction+Tables;Academic+Management+System" alt="Typing SVG">
</div>

<br>

<div align="center">

  <img src="https://img.shields.io/badge/MySQL-8+-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Tables-8-blue?style=for-the-badge" alt="Tables">
  <img src="https://img.shields.io/badge/Normalization-3FN-green?style=for-the-badge" alt="3FN">
  <img src="https://img.shields.io/badge/Relations-N%3AM-orange?style=for-the-badge" alt="N:M">

</div>

<br>

<hr>

<h2>Tabla de Contenidos</h2>

<ul>
  <li><a href="#introducción">Introducción</a></li>
  <li><a href="#diagrama-entidad-relación">Diagrama Entidad-Relación</a></li>
  <li><a href="#modelo-relacional">Modelo Relacional</a></li>
  <li><a href="#descripción-de-tablas">Descripción de Tablas</a></li>
  <li><a href="#relaciones-entre-tablas">Relaciones entre Tablas</a></li>
  <li><a href="#normalización">Normalización</a></li>
  <li><a href="#scripts-sql">Scripts SQL</a></li>
  <li><a href="#orden-de-ejecución">Orden de Ejecución</a></li>
  <li><a href="#verificación">Verificación</a></li>
  <li><a href="#datos-de-prueba">Datos de Prueba</a></li>
</ul>

<hr>

<h2 id="introducción">Introducción</h2>

<p>
  La base de datos <code>GestionAcademica</code> fue diseñada para soportar un sistema
  de gestión académica universitaria que administra <b>estudiantes</b>, <b>cursos</b>,
  <b>catedráticos</b> y sus respectivas <b>relaciones</b>.
</p>

<p>
  El diseño sigue las <b>reglas de normalización hasta 3FN</b> (Tercera Forma Normal),
  utilizando <b>tablas de catálogo</b> para entidades reutilizables y
  <b>tablas intermedias</b> para resolver las relaciones <b>muchos-a-muchos (N:M)</b>.
</p>

<p>
  El modelo incluye las tres tablas mínimas solicitadas en la prueba técnica:
</p>

<ul>
  <li><b>T1 — Estudiante</b>: información de los estudiantes.</li>
  <li><b>T2 — Curso</b>: información de los cursos.</li>
  <li><b>T3 — CursoEstudiante</b>: tabla intermedia que relaciona estudiantes con cursos.</li>
</ul>

<hr>

<h2 id="diagrama-entidad-relación">Diagrama Entidad-Relación</h2>

<h3>Diagrama Visual Completo</h3>

<p align="center">
  <img src="docs/db-diagram/diagrama.png" alt="Diagrama Entidad-Relación" width="1000"/>
</p>


<h3>Diagrama Simplificado (ASCII)</h3>

<pre>
┌────────────┐
│  Facultad  │
│────────────│
│ idFacultad │◄──────┐
│ nombre     │       │
└────────────┘       │
                     │ 1
                     │
                     │ N
                ┌────────────┐
                │  Carrera   │
                │────────────│
                │ idCarrera  │◄──────┬──────────────┐
                │ nombre     │       │              │
                │ idFacultad │       │ 1            │ 1
                └────────────┘       │              │
                                     │ N            │ N
                                ┌────────────┐  ┌─────────────┐
                                │   Curso    │  │ Estudiante  │
                                │────────────│  │─────────────│
                                │ idCurso    │  │ idEstudiante│
                                │ nombreCurso│  │ nombre      │
                                │ idGrado    │  │ apellido    │
                                │ idCarrera  │  │ nivel       │
                                │ creditos   │  │ grado       │
                                └─────┬──────┘  │ idCarrera   │
                                      │         │ seccion     │
                                      │ 1       └──────┬──────┘
                                      │                │
                                      │ N              │ 1
                                      │                │
                                      │                │ N
                                ┌─────▼──────┐  ┌──────▼────────┐
                                │CursoCatedr.│  │CursoEstudiante│
                                │────────────│  │───────────────│
                                │ idCurso    │  │ idEstudiante  │
                                │ idCatedrat.│  │ idCurso       │
                                └─────┬──────┘  │ fechaAsign.   │
                                      │         └───────┬───────┘
                                      │ N               │ N
                                      │                 │
                                      │ 1               │
                                ┌─────▼──────┐          │
                                │ Catedratico│          │
                                │────────────│          │
                                │ idCatedrat.│          │
                                │ nombre     │          │
                                │ email      │          │
                                └────────────┘          │
                                                        │
                                                        │ 1
                                                        │
                                                ┌───────▼────────┐
                                                │    Usuario     │
                                                │────────────────│
                                                │ idUsuario (PK) │
                                                │ email (UQ)     │
                                                │ password       │
                                                │ rol            │
                                                │ idEstudiante   │
                                                │ activo         │
                                                └────────────────┘
</pre>

<hr>

<h2 id="modelo-relacional">Modelo Relacional</h2>

<pre>
Facultad           (idFacultad PK, nombreFacultad)
Carrera            (idCarrera PK, nombreCarrera, idFacultad FK → Facultad)
Catedratico        (idCatedratico PK, nombreCatedratico, email)
Curso              (idCurso PK, nombreCurso, idGrado, idCarrera FK → Carrera, creditos)
CursoCatedratico   (idCurso PK/FK → Curso, idCatedratico PK/FK → Catedratico)
Estudiante         (idEstudiante PK, nombre, apellido, nivel, grado, idCarrera FK → Carrera, seccion)
CursoEstudiante    (idEstudiante PK/FK → Estudiante, idCurso PK/FK → Curso, fechaAsignacion)
Usuario            (idUsuario PK, email UQ, password, rol, idEstudiante FK → Estudiante, activo, fechaCreacion)
</pre>

<hr>

<h2 id="descripción-de-tablas">Descripción de Tablas</h2>

<h3>Facultad</h3>

<p>Catálogo de facultades de la universidad.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idFacultad</code></td><td>VARCHAR(10)</td><td>PK</td><td>Identificador único (ej: FING)</td></tr>
    <tr><td><code>nombreFacultad</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Nombre completo</td></tr>
  </tbody>
</table>

<h3>Carrera</h3>

<p>Catálogo de carreras. Cada carrera pertenece a una facultad.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idCarrera</code></td><td>VARCHAR(10)</td><td>PK</td><td>Identificador único (ej: INGSIS)</td></tr>
    <tr><td><code>nombreCarrera</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Nombre completo</td></tr>
    <tr><td><code>idFacultad</code></td><td>VARCHAR(10)</td><td>FK → Facultad</td><td>Facultad a la que pertenece</td></tr>
  </tbody>
</table>

<h3>Catedratico</h3>

<p>Catálogo de docentes.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idCatedratico</code></td><td>VARCHAR(15)</td><td>PK</td><td>Identificador único (ej: OGARCIA)</td></tr>
    <tr><td><code>nombreCatedratico</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Nombre completo</td></tr>
    <tr><td><code>email</code></td><td>VARCHAR(100)</td><td>NULL</td><td>Correo electrónico</td></tr>
  </tbody>
</table>

<h3>Curso (T2)</h3>

<p>Cursos ofrecidos por cada carrera. Cada curso pertenece a una carrera.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idCurso</code></td><td>VARCHAR(15)</td><td>PK</td><td>Identificador único (ej: MAT101)</td></tr>
    <tr><td><code>nombreCurso</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Nombre del curso</td></tr>
    <tr><td><code>idGrado</code></td><td>VARCHAR(15)</td><td>NOT NULL</td><td>Grado (ej: 1ER, 2DO)</td></tr>
    <tr><td><code>idCarrera</code></td><td>VARCHAR(10)</td><td>FK → Carrera</td><td>Carrera a la que pertenece</td></tr>
    <tr><td><code>creditos</code></td><td>INT</td><td>DEFAULT 1</td><td>Créditos académicos</td></tr>
  </tbody>
</table>

<h3>CursoCatedratico</h3>

<p>Tabla intermedia que resuelve la relación <b>N:M</b> entre <code>Curso</code> y <code>Catedratico</code>. Permite que un curso tenga varios catedráticos y un catedrático dicte varios cursos.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idCurso</code></td><td>VARCHAR(15)</td><td>PK / FK → Curso</td><td>Curso asignado</td></tr>
    <tr><td><code>idCatedratico</code></td><td>VARCHAR(15)</td><td>PK / FK → Catedratico</td><td>Catedrático asignado</td></tr>
  </tbody>
</table>

<h3>Estudiante (T1)</h3>

<p>Información de los estudiantes matriculados.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idEstudiante</code></td><td>VARCHAR(15)</td><td>PK</td><td>Identificador único (ej: 2024001)</td></tr>
    <tr><td><code>nombre</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Nombre del estudiante</td></tr>
    <tr><td><code>apellido</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Apellido del estudiante</td></tr>
    <tr><td><code>nivel</code></td><td>VARCHAR(30)</td><td>NOT NULL</td><td>Nivel (Universitario / Diversificado)</td></tr>
    <tr><td><code>grado</code></td><td>VARCHAR(15)</td><td>NOT NULL</td><td>Grado (1er, 2do, 3er, ...)</td></tr>
    <tr><td><code>idCarrera</code></td><td>VARCHAR(10)</td><td>FK → Carrera</td><td>Carrera del estudiante</td></tr>
    <tr><td><code>seccion</code></td><td>VARCHAR(5)</td><td>NOT NULL</td><td>Sección (A, B, C, D)</td></tr>
  </tbody>
</table>

<h3>CursoEstudiante (T3)</h3>

<p>Tabla intermedia que resuelve la relación <b>N:M</b> entre <code>Estudiante</code> y <code>Curso</code>. Es la tabla clave que permite gestionar las asignaciones.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idEstudiante</code></td><td>VARCHAR(15)</td><td>PK / FK → Estudiante</td><td>Estudiante asignado</td></tr>
    <tr><td><code>idCurso</code></td><td>VARCHAR(15)</td><td>PK / FK → Curso</td><td>Curso asignado</td></tr>
    <tr><td><code>fechaAsignacion</code></td><td>DATE</td><td>DEFAULT CURRENT_DATE</td><td>Fecha de la asignación</td></tr>
  </tbody>
</table>

<h3>Usuario</h3>

<p>Usuarios del sistema con roles <code>ADMIN</code> o <code>ESTUDIANTE</code>. Se vincula opcionalmente a un estudiante.</p>

<table>
  <thead>
    <tr>
      <th>Columna</th>
      <th>Tipo</th>
      <th>Restricciones</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>idUsuario</code></td><td>INT</td><td>PK, AUTO_INCREMENT</td><td>Identificador único</td></tr>
    <tr><td><code>email</code></td><td>VARCHAR(100)</td><td>UNIQUE, NOT NULL</td><td>Email de acceso</td></tr>
    <tr><td><code>password</code></td><td>VARCHAR(200)</td><td>NOT NULL</td><td>Hash bcrypt</td></tr>
    <tr><td><code>rol</code></td><td>VARCHAR(20)</td><td>CHECK IN ('ADMIN','ESTUDIANTE')</td><td>Rol del usuario</td></tr>
    <tr><td><code>idEstudiante</code></td><td>VARCHAR(15)</td><td>FK → Estudiante, NULL</td><td>Vínculo si es estudiante</td></tr>
    <tr><td><code>activo</code></td><td>TINYINT(1)</td><td>DEFAULT 1</td><td>Estado del usuario</td></tr>
    <tr><td><code>fechaCreacion</code></td><td>DATETIME</td><td>DEFAULT CURRENT_TIMESTAMP</td><td>Fecha de registro</td></tr>
  </tbody>
</table>

<hr>

<h2 id="relaciones-entre-tablas">Relaciones entre Tablas</h2>

<h3>Resumen de Relaciones</h3>

<table>
  <thead>
    <tr>
      <th>Relación</th>
      <th>Tipo</th>
      <th>Tabla Intermedia</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Facultad → Carrera</td><td>1 : N</td><td>—</td></tr>
    <tr><td>Carrera → Curso</td><td>1 : N</td><td>—</td></tr>
    <tr><td>Carrera → Estudiante</td><td>1 : N</td><td>—</td></tr>
    <tr><td>Curso ↔ Catedratico</td><td>N : M</td><td><code>CursoCatedratico</code></td></tr>
    <tr><td>Estudiante ↔ Curso</td><td>N : M</td><td><code>CursoEstudiante</code></td></tr>
    <tr><td>Estudiante → Usuario</td><td>1 : N</td><td>—</td></tr>
  </tbody>
</table>

<h3>Detalle de cada Relación</h3>

<h4>Facultad 1 : N Carrera</h4>

<p>Una facultad puede tener muchas carreras. Cada carrera pertenece a una sola facultad.</p>

<p align="center">
  <img src="docs/db-diagram/Detalle-relacion/Facultad -- Carrera (1N).png" alt="Facultad - Carrera" width="600"/>
</p>

<h4>Carrera 1 : N Curso</h4>

<p>Una carrera puede tener muchos cursos. Cada curso pertenece a una sola carrera.</p>

<p align="center">
  <img src="docs/db-diagram/Detalle-relacion/Carrera -- Curso (1N).png" alt="Carrera - Curso" width="600"/>
</p>

<h4>Carrera 1 : N Estudiante</h4>

<p>Una carrera tiene muchos estudiantes. Cada estudiante pertenece a una sola carrera.</p>

<p align="center">
  <img src="docs/db-diagram/Detalle-relacion/Carrera -- Estudiante (1N).png" alt="Carrera - Estudiante" width="600"/>
</p>

<h4>Curso N : M Catedratico</h4>

<p>
  Un curso puede tener varios catedráticos y un catedrático puede dictar varios cursos.
  Se resuelve mediante la tabla intermedia <code>CursoCatedratico</code>.
</p>

<p align="center">
  <img src="docs/db-diagram/Detalle-relacion/Curso -- Catedrático (NM).png" alt="Curso - Catedratico" width="800"/>
</p>

<h4>Estudiante N : M Curso (T3)</h4>

<p>
  Un estudiante puede estar asignado a varios cursos y un curso puede tener varios estudiantes.
  Se resuelve mediante la tabla intermedia <code>CursoEstudiante</code>, que además registra la
  fecha de asignación.
</p>

<p align="center">
  <img src="docs/db-diagram/Detalle-relacion/Estudiante -- Curso (NM) — T3.png" alt="Estudiante - Curso" width="800"/>
</p>

<h4>Estudiante 1 : N Usuario</h4>

<p>
  Un estudiante puede tener uno o varios usuarios asociados (por ejemplo, cuenta principal y
  cuenta de recuperación). Cada usuario con rol <code>ESTUDIANTE</code> debe estar vinculado
  a un estudiante.
</p>

<p align="center">
  <img src="docs/db-diagram/Detalle-relacion/Estudiante -- Usuario (1N).png" alt="Estudiante - Usuario" width="600"/>
</p>

<hr>

<h2 id="normalización">Normalización</h2>

<h3>Primera Forma Normal (1FN)</h3>

<ul>
  <li>Todos los campos contienen valores atómicos.</li>
  <li>No hay listas ni arreglos dentro de columnas.</li>
  <li>Ejemplo: los catedráticos se almacenan en una tabla aparte, no como texto separado por comas en <code>Curso</code>.</li>
</ul>

<h3>Segunda Forma Normal (2FN)</h3>

<ul>
  <li>Todas las tablas tienen PK simple, excepto las intermedias.</li>
  <li>Las tablas intermedias (<code>CursoCatedratico</code>, <code>CursoEstudiante</code>) tienen PK compuesta y no hay dependencias parciales.</li>
  <li>Ejemplo: <code>fechaAsignacion</code> depende de la combinación (idEstudiante, idCurso), no de una sola.</li>
</ul>

<h3>Tercera Forma Normal (3FN)</h3>

<ul>
  <li>No hay dependencias transitivas.</li>
  <li>Los catálogos (<code>Facultad</code>, <code>Carrera</code>, <code>Catedratico</code>) están separados.</li>
  <li>Ejemplo: <code>nombreCarrera</code> no se repite en <code>Estudiante</code> ni en <code>Curso</code>; solo se guarda el <code>idCarrera</code>.</li>
</ul>

<hr>

<h2 id="scripts-sql">Scripts SQL</h2>

<p>Los scripts están organizados en tres archivos:</p>

<table>
  <thead>
    <tr>
      <th>Archivo</th>
      <th>Propósito</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>01_schema.sql</code></td>
      <td>Crea la base de datos <code>GestionAcademica</code> y todas las tablas con sus restricciones e índices.</td>
    </tr>
    <tr>
      <td><code>02_seed.sql</code></td>
      <td>Inserta datos de prueba: facultades, carreras, catedráticos, cursos, estudiantes, asignaciones y usuarios.</td>
    </tr>
    <tr>
      <td><code>03_queries_verificacion.sql</code></td>
      <td>Queries de verificación para comprobar que todo quedó bien. No modifica datos.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2 id="orden-de-ejecución">Orden de Ejecución</h2>

<ol>
  <li>Abrir <b>MySQL Workbench</b>.</li>
  <li>Conectarse a la instancia local (<code>Local instance MySQL92</code>).</li>
  <li>Ejecutar <code>01_schema.sql</code> (crear tablas).</li>
  <li>Ejecutar <code>02_seed.sql</code> (insertar datos).</li>
  <li>Opcional: ejecutar <code>03_queries_verificacion.sql</code> para comprobar.</li>
  <li>Refrescar el panel de <b>Schemas</b> y verificar que aparece <code>GestionAcademica</code>.</li>
</ol>

<hr>

<h2 id="verificación">Verificación</h2>

<p>Después de ejecutar los scripts, se debe verificar lo siguiente:</p>

<h3>Tablas creadas</h3>

<pre><code>USE GestionAcademica;
SHOW TABLES;
</code></pre>

<p>Debe devolver 8 tablas:</p>

<pre><code>Facultad
Carrera
Catedratico
Curso
CursoCatedratico
Estudiante
CursoEstudiante
Usuario
</code></pre>

<h3>Conteo de registros</h3>

<pre><code>SELECT 'Facultad' AS tabla, COUNT(*) AS total FROM Facultad
UNION ALL SELECT 'Carrera', COUNT(*) FROM Carrera
UNION ALL SELECT 'Catedratico', COUNT(*) FROM Catedratico
UNION ALL SELECT 'Curso', COUNT(*) FROM Curso
UNION ALL SELECT 'CursoCatedratico', COUNT(*) FROM CursoCatedratico
UNION ALL SELECT 'Estudiante', COUNT(*) FROM Estudiante
UNION ALL SELECT 'CursoEstudiante', COUNT(*) FROM CursoEstudiante
UNION ALL SELECT 'Usuario', COUNT(*) FROM Usuario;
</code></pre>

<p>Debe devolver algo similar a:</p>

<table>
  <thead>
    <tr><th>tabla</th><th>total</th></tr>
  </thead>
  <tbody>
    <tr><td>Facultad</td><td>4</td></tr>
    <tr><td>Carrera</td><td>5</td></tr>
    <tr><td>Catedratico</td><td>5</td></tr>
    <tr><td>Curso</td><td>8</td></tr>
    <tr><td>CursoCatedratico</td><td>10</td></tr>
    <tr><td>Estudiante</td><td>10</td></tr>
    <tr><td>CursoEstudiante</td><td>16</td></tr>
    <tr><td>Usuario</td><td>3</td></tr>
  </tbody>
</table>

<h3>Query de estudiantes con cursos asignados</h3>

<pre><code>SELECT
    e.idEstudiante,
    e.nombre,
    e.apellido,
    c.idCurso,
    c.nombreCurso
FROM Estudiante e
LEFT JOIN CursoEstudiante ce ON ce.idEstudiante = e.idEstudiante
LEFT JOIN Curso c            ON c.idCurso = ce.idCurso
ORDER BY e.idEstudiante, c.idCurso;
</code></pre>

<hr>

<h2 id="datos-de-prueba">Datos de Prueba</h2>

<h3>Facultades</h3>

<table>
  <thead>
    <tr><th>idFacultad</th><th>nombreFacultad</th></tr>
  </thead>
  <tbody>
    <tr><td>FING</td><td>Facultad de Ingeniería</td></tr>
    <tr><td>FADM</td><td>Facultad de Administración</td></tr>
    <tr><td>FMED</td><td>Facultad de Medicina</td></tr>
    <tr><td>FCIE</td><td>Facultad de Ciencias Económicas</td></tr>
  </tbody>
</table>

<h3>Carreras</h3>

<table>
  <thead>
    <tr><th>idCarrera</th><th>nombreCarrera</th><th>idFacultad</th></tr>
  </thead>
  <tbody>
    <tr><td>INGSIS</td><td>Ingeniería en Sistemas</td><td>FING</td></tr>
    <tr><td>INGCIV</td><td>Ingeniería Civil</td><td>FING</td></tr>
    <tr><td>ADMON</td><td>Administración de Empresas</td><td>FADM</td></tr>
    <tr><td>MED</td><td>Medicina</td><td>FMED</td></tr>
    <tr><td>CONTA</td><td>Contaduría Pública</td><td>FCIE</td></tr>
  </tbody>
</table>

<h3>Cursos</h3>

<table>
  <thead>
    <tr><th>idCurso</th><th>nombreCurso</th><th>Grado</th><th>Carrera</th><th>Créditos</th></tr>
  </thead>
  <tbody>
    <tr><td>MAT101</td><td>Matemática Básica</td><td>1ER</td><td>INGSIS</td><td>4</td></tr>
    <tr><td>PROG201</td><td>Programación I</td><td>2DO</td><td>INGSIS</td><td>5</td></tr>
    <tr><td>BD301</td><td>Base de Datos I</td><td>3ER</td><td>INGSIS</td><td>5</td></tr>
    <tr><td>FIS101</td><td>Física General</td><td>1ER</td><td>INGCIV</td><td>4</td></tr>
    <tr><td>ADM201</td><td>Contabilidad General</td><td>2DO</td><td>ADMON</td><td>3</td></tr>
    <tr><td>ANA101</td><td>Anatomía I</td><td>1ER</td><td>MED</td><td>6</td></tr>
    <tr><td>CON101</td><td>Contabilidad Básica</td><td>1ER</td><td>CONTA</td><td>4</td></tr>
    <tr><td>PROG301</td><td>Programación Avanzada</td><td>3ER</td><td>INGSIS</td><td>5</td></tr>
  </tbody>
</table>

<h3>Catedráticos</h3>

<table>
  <thead>
    <tr><th>idCatedratico</th><th>nombreCatedratico</th><th>email</th></tr>
  </thead>
  <tbody>
    <tr><td>OGARCIA</td><td>Oscar García</td><td>ogarcia@uni.edu</td></tr>
    <tr><td>MLOPEZ</td><td>María López</td><td>mlopez@uni.edu</td></tr>
    <tr><td>JPEREZ</td><td>Juan Pérez</td><td>jperez@uni.edu</td></tr>
    <tr><td>RMENDEZ</td><td>Rosa Méndez</td><td>rmendez@uni.edu</td></tr>
    <tr><td>ACASTRO</td><td>Andrés Castro</td><td>acastro@uni.edu</td></tr>
  </tbody>
</table>

<h3>Estudiantes</h3>

<table>
  <thead>
    <tr><th>idEstudiante</th><th>Nombre</th><th>Apellido</th><th>Grado</th><th>Carrera</th><th>Sección</th></tr>
  </thead>
  <tbody>
    <tr><td>2024001</td><td>Ana</td><td>Ramírez</td><td>1er</td><td>INGSIS</td><td>A</td></tr>
    <tr><td>2024002</td><td>Luis</td><td>Castillo</td><td>2do</td><td>INGSIS</td><td>A</td></tr>
    <tr><td>2024003</td><td>Sofía</td><td>Hernández</td><td>3er</td><td>INGSIS</td><td>B</td></tr>
    <tr><td>2024004</td><td>Carlos</td><td>Morales</td><td>1er</td><td>INGCIV</td><td>A</td></tr>
    <tr><td>2024005</td><td>Daniela</td><td>Vásquez</td><td>2do</td><td>ADMON</td><td>A</td></tr>
    <tr><td>2024006</td><td>Pedro</td><td>Gómez</td><td>1er</td><td>MED</td><td>A</td></tr>
    <tr><td>2024007</td><td>María</td><td>López</td><td>3er</td><td>INGSIS</td><td>A</td></tr>
    <tr><td>2024008</td><td>Jorge</td><td>Fernández</td><td>1er</td><td>CONTA</td><td>A</td></tr>
    <tr><td>2024009</td><td>Lucía</td><td>Martínez</td><td>2do</td><td>INGSIS</td><td>B</td></tr>
    <tr><td>2024010</td><td>Diego</td><td>Herrera</td><td>1er</td><td>INGCIV</td><td>B</td></tr>
  </tbody>
</table>

<h3>Usuarios</h3>

<table>
  <thead>
    <tr><th>Email</th><th>Rol</th><th>Contraseña</th></tr>
  </thead>
  <tbody>
    <tr><td>admin@uni.edu</td><td>ADMIN</td><td>Admin123*</td></tr>
    <tr><td>2024001@uni.edu</td><td>ESTUDIANTE</td><td>Estudiante123*</td></tr>
    <tr><td>2024002@uni.edu</td><td>ESTUDIANTE</td><td>Estudiante123*</td></tr>
  </tbody>
</table>

<blockquote>
  Las contraseñas se almacenan como hashes <b>bcrypt</b>. Los hashes reales se generan
  automáticamente al primer arranque del backend mediante el <code>UsuariosSeedService</code>.
</blockquote>

<hr>

<h2>Índices</h2>

<p>Para mejorar el rendimiento de las consultas más frecuentes, se definieron los siguientes índices:</p>

<table>
  <thead>
    <tr><th>Índice</th><th>Tabla</th><th>Columna</th></tr>
  </thead>
  <tbody>
    <tr><td><code>IX_Estudiante_Carrera</code></td><td>Estudiante</td><td>idCarrera</td></tr>
    <tr><td><code>IX_Curso_Carrera</code></td><td>Curso</td><td>idCarrera</td></tr>
    <tr><td><code>IX_CE_Curso</code></td><td>CursoEstudiante</td><td>idCurso</td></tr>
    <tr><td><code>IX_Usuario_Rol</code></td><td>Usuario</td><td>rol</td></tr>
  </tbody>
</table>

<hr>

<h2>Restricciones de Integridad</h2>

<ul>
  <li><b>PRIMARY KEY</b> en todas las tablas.</li>
  <li><b>FOREIGN KEY</b> con <code>ON DELETE CASCADE</code> en las tablas intermedias.</li>
  <li><b>ON DELETE SET NULL</b> en <code>Usuario.idEstudiante</code> (si se elimina el estudiante, el usuario no se borra).</li>
  <li><b>UNIQUE</b> en <code>Usuario.email</code>.</li>
  <li><b>CHECK</b> en <code>Usuario.rol</code> para permitir solo <code>ADMIN</code> y <code>ESTUDIANTE</code>.</li>
</ul>

<hr>

<p align="center">
  <sub>Documentación de base de datos — Prueba técnica</sub>
</p>
