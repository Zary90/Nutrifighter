//parte realizada el 18/04

import { Module } from '@nestjs/common'; // Importa el decorador Module
import { UsuariosController } from './usuarios.controller'; // Importa el controlador UsuariosController
import { UsuariosService } from './usuarios.service'; // Importa el servicio UsuariosService
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrmModule
import { Usuario } from '../entidades/usuario.entity'; // Importa la entidad Usuario

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Configura TypeOrm para este módulo, registrando la entidad Usuario
  controllers: [UsuariosController], // Declara que este módulo usa UsuariosController
  providers: [UsuariosService], // Declara que este módulo usa UsuariosService
})
export class UsuariosModule {} // Exporta la clase del módulo
