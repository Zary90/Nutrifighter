// parte realizada el 12/04

import { Module } from '@nestjs/common'; // Importa el decorador Module
import { AlimentosController } from './foods.controller'; // Importa el controlador AlimentosController
import { AlimentosService } from './foods.service'; // Importa el servicio AlimentosService
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrmModule
import { Alimento } from '../entities/food.entities'; // Importa la entidad Alimento.  Asegúrate de que la ruta es correcta!

@Module({
  imports: [TypeOrmModule.forFeature([Alimento])], // Configura TypeOrm para este módulo, registrando la entidad Alimento
  controllers: [AlimentosController], // Declara que este módulo usa AlimentosController
  providers: [AlimentosService], // Declara que este módulo usa AlimentosService
  exports: [TypeOrmModule], // Exporta TypeOrmModule para que otros módulos puedan usarlo
})
export class AlimentosModule {} // Exporta la clase del módulo