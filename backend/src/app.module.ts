import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Usuario } from './usuarios/entities/usuario.entity';
import { Estudiante } from './estudiantes/entities/estudiante.entity';
import { Curso } from './cursos/entities/curso.entity';
import { Catedratico } from './cursos/entities/catedratico.entity';
import { CursoCatedratico } from './cursos/entities/curso-catedratico.entity';
import { CursoEstudiante } from './asignaciones/entities/curso-estudiante.entity';

import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') ?? '3306', 10),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [
          Usuario,
          Estudiante,
          Curso,
          Catedratico,
          CursoCatedratico,
          CursoEstudiante,
        ],
        synchronize: false,
        logging: false,
      }),
    }),
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
