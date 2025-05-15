//parte realizada el 18/04

import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common'; // Importa los decoradores de NestJS
import { UsuariosService } from './usuarios.service'; // Importa el servicio UsuariosService
import { Usuario } from '../entities/user.entity'; // Importa la entidad Usuario

@Controller('usuarios') // Define el prefijo de la ruta para este controlador. Todas las rutas aquí comienzan con '/usuarios'
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {} // Inyecta el servicio UsuariosService en el constructor

  @Post() // Define un endpoint POST para crear un nuevo usuario
  async create(@Body() userData: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.create(userData); // Llama al método create del servicio para crear el usuario
  }
  
  // realizado el 06/05
  @Get() // Define un endpoint GET para obtener todos los usuarios
  async findAll(
    @Query('page') page: string = '1', // Parámetro de consulta opcional para la página actual (por defecto: '1')
    @Query('limit') limit: string = '10', // Parámetro de consulta opcional para el número de resultados por página (por defecto: '10')
  ): Promise<{ data: Usuario[]; total: number }> {
    const pageNumber = parseInt(page, 10); // Convierte el parámetro de página a número entero
    const limitNumber = parseInt(limit, 10); // Convierte el parámetro de límite a número entero
    return this.usuariosService.findAll(pageNumber, limitNumber); // Llama al método findAll del servicio, pasando los parámetros de paginación
  }

  //parte realizada el 18/04
  
  @Get(':id') // Define un endpoint GET para obtener un usuario por su ID
  async findOne(@Param('id') id: string): Promise<Usuario | undefined> {
    return this.usuariosService.findOne(parseInt(id, 10)); // Llama al método findOne del servicio para obtener un usuario por su ID. Convierte el id a número.
  }

  @Put(':id') // Define un endpoint PUT para actualizar un usuario
  async update(@Param('id') id: string, @Body() userData: Partial<Usuario>): Promise<Usuario | undefined> {
    return this.usuariosService.update(parseInt(id, 10), userData); // Llama al método update del servicio para actualizar un usuario. Convierte el id a número.
  }

  @Delete(':id') // Define un endpoint DELETE para eliminar un usuario
  async remove(@Param('id') id: string): Promise<void> {
    return this.usuariosService.remove(parseInt(id, 10)); // Llama al método remove del servicio para eliminar un usuario. Convierte el id a número.
  }
}