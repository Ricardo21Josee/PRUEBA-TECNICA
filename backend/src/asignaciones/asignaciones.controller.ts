import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { CreateAsignacionDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolUsuario } from '../usuarios/entities/usuario.entity';

@Controller('asignaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsignacionesController {
  constructor(private readonly asignacionesService: AsignacionesService) {}

  @Post()
  @Roles(RolUsuario.ADMIN)
  create(@Body() dto: CreateAsignacionDto) {
    return this.asignacionesService.create(dto);
  }

  @Delete(':idEstudiante/:idCurso')
  @Roles(RolUsuario.ADMIN)
  remove(
    @Param('idEstudiante') idEstudiante: string,
    @Param('idCurso') idCurso: string,
  ) {
    return this.asignacionesService.remove(idEstudiante, idCurso);
  }

  @Get('mis-cursos')
  @Roles(RolUsuario.ESTUDIANTE)
  findMisCursos(@CurrentUser() user: { idEstudiante: string }) {
    return this.asignacionesService.findMisCursos(user.idEstudiante);
  }
}
