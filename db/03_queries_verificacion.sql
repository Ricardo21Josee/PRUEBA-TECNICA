/* =========================================================
    SISTEMA DE GESTIÓN ACADÉMICA UNIVERSITARIA
    Script 03: Queries de verificación y ejemplos de lectura
   ========================================================= */

USE GestionAcademica;

/* ---------- 1. Lista de cursos (con catedráticos) ---------- */
SELECT
    c.idCurso,
    c.nombreCurso,
    c.idGrado,
    c.idCarrera,
    cat.idCatedratico,
    cat.nombreCatedratico
FROM Curso c
LEFT JOIN CursoCatedratico cc ON cc.idCurso = c.idCurso
LEFT JOIN Catedratico cat     ON cat.idCatedratico = cc.idCatedratico
ORDER BY c.idCurso;

/* ---------- 2. Lista de estudiantes ---------- */
SELECT
    e.idEstudiante,
    e.nombre,
    e.apellido,
    e.nivel,
    e.grado,
    e.idCarrera,
    e.seccion
FROM Estudiante e
ORDER BY e.idEstudiante;

/* ---------- 3. Lista de estudiantes con sus cursos asignados ---------- */
SELECT
    e.idEstudiante,
    e.nombre,
    e.apellido,
    e.nivel,
    e.grado,
    e.idCarrera,
    e.seccion,
    c.idCurso,
    c.nombreCurso
FROM Estudiante e
LEFT JOIN CursoEstudiante ce ON ce.idEstudiante = e.idEstudiante
LEFT JOIN Curso c            ON c.idCurso = ce.idCurso
ORDER BY e.idEstudiante, c.idCurso;

/* ---------- 4. Estudiante específico con sus cursos ---------- */
SELECT
    e.idEstudiante,
    e.nombre,
    e.apellido,
    e.nivel,
    e.grado,
    e.idCarrera,
    e.seccion,
    c.idCurso,
    c.nombreCurso
FROM Estudiante e
LEFT JOIN CursoEstudiante ce ON ce.idEstudiante = e.idEstudiante
LEFT JOIN Curso c            ON c.idCurso = ce.idCurso
WHERE e.idEstudiante = '2024001';

/* ---------- 5. Verificar usuarios y roles ---------- */
SELECT
    u.idUsuario,
    u.email,
    u.rol,
    u.idEstudiante,
    u.activo
FROM Usuario u
ORDER BY u.idUsuario;

/* ---------- 6. Cursos por carrera ---------- */
SELECT
    ca.idCarrera,
    ca.nombreCarrera,
    c.idCurso,
    c.nombreCurso,
    c.idGrado,
    c.creditos
FROM Carrera ca
LEFT JOIN Curso c ON c.idCarrera = ca.idCarrera
ORDER BY ca.idCarrera, c.idCurso;