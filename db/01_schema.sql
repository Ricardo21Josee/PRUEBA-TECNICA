/* =========================================================
    SISTEMA DE GESTIÓN ACADÉMICA UNIVERSITARIA
    Script 01: Creación de la base de datos y tablas
   ========================================================= */

DROP DATABASE IF EXISTS GestionAcademica;
CREATE DATABASE GestionAcademica
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE GestionAcademica;

/* =========================================================
    TABLA: Facultad (catálogo)
   ========================================================= */
CREATE TABLE Facultad (
    idFacultad      VARCHAR(10)  NOT NULL,
    nombreFacultad  VARCHAR(100) NOT NULL,
    PRIMARY KEY (idFacultad)
) ENGINE=InnoDB;

/* =========================================================
    TABLA: Carrera (catálogo)
   ========================================================= */
CREATE TABLE Carrera (
    idCarrera      VARCHAR(10)  NOT NULL,
    nombreCarrera  VARCHAR(100) NOT NULL,
    idFacultad     VARCHAR(10)  NOT NULL,
    PRIMARY KEY (idCarrera),
    CONSTRAINT FK_Carrera_Facultad FOREIGN KEY (idFacultad)
        REFERENCES Facultad(idFacultad)
        ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================================================
    TABLA: Catedratico
   ========================================================= */
CREATE TABLE Catedratico (
    idCatedratico      VARCHAR(15)  NOT NULL,
    nombreCatedratico  VARCHAR(100) NOT NULL,
    email              VARCHAR(100) NULL,
    PRIMARY KEY (idCatedratico)
) ENGINE=InnoDB;

/* =========================================================
    TABLA: Curso
   ========================================================= */
CREATE TABLE Curso (
    idCurso      VARCHAR(15)  NOT NULL,
    nombreCurso  VARCHAR(100) NOT NULL,
    idGrado      VARCHAR(15)  NOT NULL,
    idCarrera    VARCHAR(10)  NOT NULL,
    creditos     INT          NOT NULL DEFAULT 1,
    PRIMARY KEY (idCurso),
    CONSTRAINT FK_Curso_Carrera FOREIGN KEY (idCarrera)
        REFERENCES Carrera(idCarrera)
        ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================================================
    TABLA: Cursos del Catedratico
    Permite que un curso tenga varios catedráticos
   ========================================================= */
CREATE TABLE CursoCatedratico (
    idCurso        VARCHAR(15) NOT NULL,
    idCatedratico  VARCHAR(15) NOT NULL,
    PRIMARY KEY (idCurso, idCatedratico),
    CONSTRAINT FK_CC_Curso FOREIGN KEY (idCurso)
        REFERENCES Curso(idCurso) ON DELETE CASCADE,
    CONSTRAINT FK_CC_Catedratico FOREIGN KEY (idCatedratico)
        REFERENCES Catedratico(idCatedratico) ON DELETE CASCADE
) ENGINE=InnoDB;

/* =========================================================
    TABLA: Estudiante 
   ========================================================= */
CREATE TABLE Estudiante (
    idEstudiante  VARCHAR(15)  NOT NULL,
    nombre        VARCHAR(100) NOT NULL,
    apellido      VARCHAR(100) NOT NULL,
    nivel         VARCHAR(30)  NOT NULL,   
    grado         VARCHAR(15)  NOT NULL,  
    idCarrera     VARCHAR(10)  NOT NULL,
    seccion       VARCHAR(5)   NOT NULL,   
    PRIMARY KEY (idEstudiante),
    CONSTRAINT FK_Estudiante_Carrera FOREIGN KEY (idCarrera)
        REFERENCES Carrera(idCarrera)
        ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================================================
    TABLA: Cursos de Estudiantes
    Tabla intermedia que relaciona estudiantes con cursos
   ========================================================= */
CREATE TABLE CursoEstudiante (
    idEstudiante     VARCHAR(15) NOT NULL,
    idCurso          VARCHAR(15) NOT NULL,
    fechaAsignacion  DATE NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (idEstudiante, idCurso),
    CONSTRAINT FK_CE_Estudiante FOREIGN KEY (idEstudiante)
        REFERENCES Estudiante(idEstudiante) ON DELETE CASCADE,
    CONSTRAINT FK_CE_Curso FOREIGN KEY (idCurso)
        REFERENCES Curso(idCurso) ON DELETE CASCADE
) ENGINE=InnoDB;

/* =========================================================
    TABLA: Usuario (autenticación JWT + roles)
    Roles: ADMIN | ESTUDIANTE
   ========================================================= */
CREATE TABLE Usuario (
    idUsuario    INT AUTO_INCREMENT NOT NULL,
    email        VARCHAR(100) NOT NULL,
    password     VARCHAR(200) NOT NULL,  
    rol          VARCHAR(20)  NOT NULL,   
    idEstudiante VARCHAR(15)  NULL,       
    activo       TINYINT(1)   NOT NULL DEFAULT 1,
    fechaCreacion DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idUsuario),
    UNIQUE KEY UQ_Usuario_Email (email),
    CONSTRAINT CK_Usuario_Rol CHECK (rol IN ('ADMIN', 'ESTUDIANTE')),
    CONSTRAINT FK_Usuario_Estudiante FOREIGN KEY (idEstudiante)
        REFERENCES Estudiante(idEstudiante)
        ON DELETE SET NULL
) ENGINE=InnoDB;

/* =========================================================
    ÍNDICES de apoyo para consultas frecuentes
   ========================================================= */
CREATE INDEX IX_Estudiante_Carrera ON Estudiante(idCarrera);
CREATE INDEX IX_Curso_Carrera      ON Curso(idCarrera);
CREATE INDEX IX_CE_Curso           ON CursoEstudiante(idCurso);
CREATE INDEX IX_Usuario_Rol        ON Usuario(rol);

SELECT 'Base de datos GestionAcademica creada correctamente.' AS mensaje;