// parte realizada el 15/04

import { Module } from '@nestjs/common'; // Importa el decorador Module
import { RecetasController } from './recetas.controller'; // Importa el controlador RecetasController
import { RecetasService } from './recetas.service'; // Importa el servicio RecetasService
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el modulo TypeOrmModule
import { Receta } from '../entidades/receta.entity'; // Importa la entidad Receta

@Module({
  imports: [TypeOrmModule.forFeature([Receta])], // Configura TypeOrm para este modulo, registrando la entidad Receta
  controllers: [RecetasController], // Declara que este modulo usa RecetasController
  providers: [RecetasService], // Declara que este modulo usa RecetasService
})
export class RecetasModule {} // Exporta la clase del modulo
