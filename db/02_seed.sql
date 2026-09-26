/* =========================================================
   SISTEMA DE GESTIÓN ACADÉMICA UNIVERSITARIA
   Script 02: Populación de datos de prueba
   ========================================================= */

USE GestionAcademica;

/* ============ FACULTADES ============ */
INSERT INTO Facultad (idFacultad, nombreFacultad) VALUES
('FING', 'Facultad de Ingeniería'),
('FADM', 'Facultad de Administración'),
('FMED', 'Facultad de Medicina'),
('FCIE', 'Facultad de Ciencias Económicas');

/* ============ CARRERAS ============ */
INSERT INTO Carrera (idCarrera, nombreCarrera, idFacultad) VALUES
('INGSIS', 'Ingeniería en Sistemas',        'FING'),
('INGCIV', 'Ingeniería Civil',              'FING'),
('ADMON',  'Administración de Empresas',    'FADM'),
('MED',    'Medicina',                      'FMED'),
('CONTA',  'Contaduría Pública',            'FCIE');

/* ============ CATEDRATICOS ============ */
INSERT INTO Catedratico (idCatedratico, nombreCatedratico, email) VALUES
('OGARCIA', 'Oscar García',      'ogarcia@uni.edu'),
('MLOPEZ',  'María López',       'mlopez@uni.edu'),
('JPEREZ',  'Juan Pérez',        'jperez@uni.edu'),
('RMENDEZ', 'Rosa Méndez',       'rmendez@uni.edu'),
('ACASTRO', 'Andrés Castro',     'acastro@uni.edu');

/* ============ CURSOS ============ */
INSERT INTO Curso (idCurso, nombreCurso, idGrado, idCarrera, creditos) VALUES
('MAT101',  'Matemática Básica',       '1ER', 'INGSIS', 4),
('PROG201', 'Programación I',          '2DO', 'INGSIS', 5),
('BD301',   'Base de Datos I',         '3ER', 'INGSIS', 5),
('FIS101',  'Física General',          '1ER', 'INGCIV', 4),
('ADM201',  'Contabilidad General',    '2DO', 'ADMON',  3),
('ANA101',  'Anatomía I',              '1ER', 'MED',    6),
('CON101',  'Contabilidad Básica',     '1ER', 'CONTA',  4),
('PROG301', 'Programación Avanzada',   '3ER', 'INGSIS', 5);

/* ============ CURSO - CATEDRATICO (N:M) ============ */
INSERT INTO CursoCatedratico (idCurso, idCatedratico) VALUES
('MAT101',  'OGARCIA'),
('PROG201', 'MLOPEZ'),
('BD301',   'MLOPEZ'),
('BD301',   'JPEREZ'),
('FIS101',  'OGARCIA'),
('ADM201',  'RMENDEZ'),
('ANA101',  'JPEREZ'),
('CON101',  'RMENDEZ'),
('PROG301', 'ACASTRO'),
('PROG301', 'MLOPEZ');

/* ============ ESTUDIANTES ============ */
INSERT INTO Estudiante (idEstudiante, nombre, apellido, nivel, grado, idCarrera, seccion) VALUES
('2024001', 'Ana',     'Ramírez',    'Universitario', '1er', 'INGSIS', 'A'),
('2024002', 'Luis',    'Castillo',   'Universitario', '2do', 'INGSIS', 'A'),
('2024003', 'Sofía',   'Hernández',  'Universitario', '3er', 'INGSIS', 'B'),
('2024004', 'Carlos',  'Morales',    'Universitario', '1er', 'INGCIV', 'A'),
('2024005', 'Daniela', 'Vásquez',    'Universitario', '2do', 'ADMON',  'A'),
('2024006', 'Pedro',   'Gómez',      'Universitario', '1er', 'MED',    'A'),
('2024007', 'María',   'López',      'Universitario', '3er', 'INGSIS', 'A'),
('2024008', 'Jorge',   'Fernández',  'Universitario', '1er', 'CONTA',  'A'),
('2024009', 'Lucía',   'Martínez',   'Universitario', '2do', 'INGSIS', 'B'),
('2024010', 'Diego',   'Herrera',    'Universitario', '1er', 'INGCIV', 'B');

/* ============ ASIGNACIÓN DE CURSOS A ESTUDIANTES (T3) ============ */
INSERT INTO CursoEstudiante (idEstudiante, idCurso) VALUES
('2024001', 'MAT101'),
('2024001', 'PROG201'),
('2024002', 'PROG201'),
('2024002', 'BD301'),
('2024003', 'BD301'),
('2024003', 'PROG301'),
('2024004', 'FIS101'),
('2024004', 'MAT101'),
('2024005', 'ADM201'),
('2024006', 'ANA101'),
('2024007', 'BD301'),
('2024007', 'PROG301'),
('2024008', 'CON101'),
('2024009', 'PROG201'),
('2024009', 'PROG301'),
('2024010', 'FIS101');





/* ============ USUARIOS (login + roles) ============ */
/* Los passwords se hashean con bcrypt desde NestJS al primer arranque.
   Credenciales por defecto:
     - Admin:      admin@uni.edu       / Admin123*
     - Estudiante: 2024001@uni.edu     / Estudiante123*
     - Estudiante: 2024002@uni.edu     / Estudiante123*
*/
INSERT INTO Usuario (email, password, rol, idEstudiante) VALUES
('admin@uni.edu',   'PLACEHOLDER_HASH', 'ADMIN',      NULL),
('2024001@uni.edu', 'PLACEHOLDER_HASH', 'ESTUDIANTE', '2024001'),
('2024002@uni.edu', 'PLACEHOLDER_HASH', 'ESTUDIANTE', '2024002');

SELECT '✔ Datos de prueba insertados correctamente.' AS mensaje;