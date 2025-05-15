// parte realizada el 15/04

import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, NotFoundException, Query } from '@nestjs/common'; // Importa los decoradores y excepciones de NestJS
import { RecetasService } from './recetas.service'; // Importa el servicio RecetasService
import { Receta } from '../entities/recipe.entity'; // Importa la entidad Receta
import { Alimento } from '../entities/food.entities'; // Importa la entidad Alimento

@Controller('recetas') // Define el prefijo de la ruta para este controlador. Todas las rutas aquí comienzan con '/recetas'
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {} // Inyecta el servicio RecetasService en el constructor

  @Post() // Define un endpoint POST para crear una nueva receta
  async create(@Body() recetaData: Partial<Receta>): Promise<Receta> {
    return this.recetasService.create(recetaData); // Llama al método create del servicio para crear la receta
  }

  // Realizado el 06/05
  @Get() // Define un endpoint GET para obtener todas las recetas
  async findAll(
    @Query('page') page: string = '1', // Parámetro de consulta opcional para la página actual (por defecto: '1')
    @Query('limit') limit: string = '10', // Parámetro de consulta opcional para el número de resultados por página (por defecto: '10')
  ): Promise<{ data: Receta[]; total: number }> {
    const pageNumber = parseInt(page, 10); // Convierte el parámetro de página a número entero
    const limitNumber = parseInt(limit, 10); // Convierte el parámetro de límite a número entero
    return this.recetasService.findAll(); // Llama al método findAll del servicio para obtener todas las recetas
  }

   // parte realizada el 15/04
  @Get(':id') // Define un endpoint GET para obtener una receta por su ID
  async findOne(@Param('id') id: string): Promise<Receta | undefined> {
    return this.recetasService.findOne(parseInt(id, 10)); // Llama al método findOne del servicio para obtener una receta por su ID. Convierte el id a número.
  }

  @Put(':id') // Define un endpoint PUT para actualizar una receta
  async update(@Param('id') id: string, @Body() recetaData: Partial<Receta>): Promise<Receta | undefined> {
    return this.recetasService.update(parseInt(id, 10), recetaData); // Llama al método update del servicio para actualizar una receta. Convierte el id a número.
  }

  @Delete(':id') // Define un endpoint DELETE para eliminar una receta
  async remove(@Param('id') id: string): Promise<void> {
    return this.recetasService.remove(parseInt(id, 10)); // Llama al método remove del servicio para eliminar una receta. Convierte el id a número.
  }

  // Nuevos Endpoints para Ingredientes

  @Post(':id/ingredientes') // Define un endpoint POST para añadir un ingrediente a una receta
  async addIngrediente(
    @Param('id') id: string, // Obtiene el ID de la receta de la URL
    @Body('alimentoId') alimentoId: number, // Obtiene el ID del alimento del cuerpo de la petición.  Esperamos que el cuerpo contenga { alimentoId: number }
  ): Promise<Receta> {
    try {
      return await this.recetasService.addIngredienteToReceta(parseInt(id, 10), alimentoId); // Llama al método del servicio para añadir el ingrediente. Convierte el id a número.
    } catch (error) {
      // Maneja los errores específicos que pueda lanzar el servicio
      if (error instanceof NotFoundException) {
        throw error; // Reenvía la excepción NotFoundException para que NestJS la maneje
      }
      throw new BadRequestException('No se pudo añadir el ingrediente a la receta.'); // Lanza BadRequestException para otros errores
    }
  }

  @Delete(':id/ingredientes/:alimentoId') // Define un endpoint DELETE para eliminar un ingrediente de una receta
  async removeIngrediente(
    @Param('id') id: string, // Obtiene el ID de la receta de la URL
    @Param('alimentoId') alimentoId: string, // Obtiene el ID del alimento de la URL
  ): Promise<Receta> {
    try {
      return await this.recetasService.removeIngredienteFromReceta(parseInt(id, 10), parseInt(alimentoId, 10)); // Llama al método del servicio para eliminar el ingrediente. Convierte los ids a número.
    } catch (error) {
      // Maneja los errores específicos que pueda lanzar el servicio
       if (error instanceof NotFoundException) {
        throw error; // Reenvía la excepción NotFoundException para que NestJS la maneje
      }
      throw new BadRequestException('No se pudo eliminar el ingrediente de la receta.'); // Lanza BadRequestException para otros errores
    }
  }
}