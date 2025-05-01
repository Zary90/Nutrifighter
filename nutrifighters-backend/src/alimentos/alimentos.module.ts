// parte realizada el 12/04

import { Module } from '@nestjs/common'; // Importa el decorador Module
import { AlimentosController } from './alimentos.controller'; // Importa el controlador AlimentosController
import { AlimentosService } from './alimentos.service'; // Importa el servicio AlimentosService
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrmModule
import { Alimento } from '../entidades/alimentos.entidad'; // Importa la entidad Alimento.  Asegúrate de que la ruta es correcta!

@Module({
  imports: [TypeOrmModule.forFeature([Alimento])], // Configura TypeOrm para este módulo, registrando la entidad Alimento
  controllers: [AlimentosController], // Declara que este módulo usa AlimentosController
  providers: [AlimentosService], // Declara que este módulo usa AlimentosService
})
export class AlimentosModule {} // Exporta la clase del módulo