// parte realizada el 12/04

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'; // Importa los decoradores de NestJS
import { AlimentosService } from './alimentos.service'; // Importa el servicio AlimentosService
import { Alimento } from '../entidades/alimentos.entidad'; // Importa la entidad Alimento.  Asegúrate de que la ruta es correcta!

@Controller('alimentos') // Define el prefijo de la ruta para este controlador.  Todas las rutas aquí comienzan con '/alimentos'
export class AlimentosController {
  constructor(private readonly alimentosService: AlimentosService) {} // Inyecta el servicio AlimentosService en el constructor

  @Post() // Define un endpoint POST para crear un nuevo alimento
  async create(@Body() alimentoData: Partial<Alimento>): Promise<Alimento> {
    return this.alimentosService.create(alimentoData); // Llama al método create del servicio para crear el alimento
  }

  @Get() // Define un endpoint GET para obtener todos los alimentos
  async findAll(): Promise<Alimento[]> {
    return this.alimentosService.findAll(); // Llama al método findAll del servicio para obtener todos los alimentos
  }

  @Get(':id') // Define un endpoint GET para obtener un alimento por su ID
  async findOne(@Param('id') id: string): Promise<Alimento | undefined> {
    return this.alimentosService.findOne(parseInt(id, 10)); // Llama al método findOne del servicio para obtener un alimento por su ID.  Convierte el id a número.
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