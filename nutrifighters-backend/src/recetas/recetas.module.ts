// parte realizada el 15/04

import { Module } from '@nestjs/common'; // Importa el decorador Module
import { RecetasController } from './recetas.controller'; // Importa el controlador RecetasController
import { RecetasService } from './recetas.service'; // Importa el servicio RecetasService
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrmModule
import { Receta } from '../entities/recipe.entity'; // Importa la entidad Receta
import { AlimentosModule } from '../food/foods.module'; // Importa AlimentosModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Receta]), // Configura TypeOrm para este módulo, registrando la entidad Receta
    AlimentosModule, // Importa el módulo de alimentos para que esté disponible en este módulo
  ],
  controllers: [RecetasController], // Declara que este módulo usa RecetasController
  providers: [RecetasService], // Declara que este módulo usa RecetasService
})
export class RecetasModule {} // Exporta la clase del módulo
