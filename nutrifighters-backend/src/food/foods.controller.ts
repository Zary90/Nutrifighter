
// parte realizada el 12/04

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common'; // Importa los decoradores de NestJS
import { AlimentosService } from './foods.service'; // Importa el servicio AlimentosService
import { Alimento } from '../entities/food.entities'; // Importa la entidad Alimento.  Asegúrate de que la ruta es correcta!
import { CreateAlimentoDto } from './dto/CreateAlimentoDto';
import { RolesGuard } from '../auth/role.guard'; // Importa el guardián de roles
import { Roles } from '../auth/roles.decorator'; // Importa el decorador Roles
import { Reflector } from '@nestjs/core';

@Controller('alimentos') // Define el prefijo de la ruta para este controlador.  Todas las rutas aquí comienzan con '/alimentos'
export class AlimentosController {
  constructor(
    private readonly alimentosService: AlimentosService,
    private readonly reflector: Reflector
  ) {} // Inyecta el servicio AlimentosService en el constructor

  @Post() // Define un endpoint POST para crear un nuevo alimento
  @UseGuards(RolesGuard(['administrador'])) // Aplica el guardián de roles, solo permite los roles especificados en @Roles
  @Roles('administrador') // Define los roles permitidos para esta ruta
  async create(@Body() alimentoData: CreateAlimentoDto): Promise<Alimento> {
    return this.alimentosService.create(alimentoData); // Llama al método create del servicio para crear el alimento
  }
// realizado el 06/05

  @Get() // Define un endpoint GET para obtener todos los alimentos
  async findAll(
    @Query('nombre') nombre?: string, // Parámetro de consulta opcional para filtrar por nombre
    @Query('categoria') categoria?: string, // Parámetro de consulta opcional para filtrar por categoría
    @Query('caloriasMin') caloriasMin?: number, // Parámetro de consulta opcional para filtrar por calorías mínimas
    @Query('caloriasMax') caloriasMax?: number, // Parámetro de consulta opcional para filtrar por calorías máximas
    @Query('page') page: string = '1', // Parámetro de consulta opcional para la página actual (por defecto: '1')
    @Query('limit') limit: string = '10', // Parámetro de consulta opcional para el número de resultados por página (por defecto: '10')
  ): Promise<{ data: Alimento[]; total: number }> {
    const pageNumber = parseInt(page, 10); // Convierte el parámetro de página a número
    const limitNumber = parseInt(limit, 10); // Convierte el parámetro de límite a número
    return this.alimentosService.findAll(nombre, categoria, caloriasMin, caloriasMax, pageNumber, limitNumber); // Llama al método findAll del servicio con los parámetros de búsqueda y paginación
  }

// parte realizada el 12/04

  @Get(':id') // Define un endpoint GET para obtener un alimento por su ID
  async findOne(@Param('id') id: string): Promise<Alimento | undefined> {
    return this.alimentosService.findOne(parseInt(id, 10)); // Llama al método findOne del servicio para obtener un alimento por su ID. Convierte el id a número.
  }

  @Put(':id') // Define un endpoint PUT para actualizar un alimento
  async update(@Param('id') id: string, @Body() alimentoData: Partial<Alimento>): Promise<Alimento | undefined> {
    return this.alimentosService.update(parseInt(id, 10), alimentoData); // Llama al método update del servicio para actualizar un alimento. Convierte el id a número.
  }

  @Delete(':id') // Define un endpoint DELETE para eliminar un alimento
  async remove(@Param('id') id: string): Promise<void> {
    return this.alimentosService.remove(parseInt(id, 10)); // Llama al método remove del servicio para eliminar un alimento. Convierte el id a número.
  }
}