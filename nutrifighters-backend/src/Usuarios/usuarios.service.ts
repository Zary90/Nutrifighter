//parte realizada el 18/04

import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable
import { InjectRepository } from '@nestjs/typeorm'; // Importa el decorador InjectRepository
import { Repository } from 'typeorm'; // Importa la clase Repository
import { Usuario } from '../entities/user.entity'; // Importa la entidad Usuario

@Injectable() // Marca la clase como un servicio
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) // Inyecta el repositorio de la entidad Usuario
    private usuariosRepository: Repository<Usuario>, // Declara e inicializa el repositorio de Usuario
  ) {}

  // Método para crear un nuevo usuario
  async create(userData: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuariosRepository.create(userData); // Crea una instancia de Usuario con los datos proporcionados
    return this.usuariosRepository.save(usuario); // Guarda el nuevo usuario en la base de datos y devuelve el resultado
  }
  //Realizado el 06/05
  // Método para obtener todos los usuarios 
  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Usuario[]; total: number }> {
    const [data, total] = await this.usuariosRepository.findAndCount({ // Realiza la consulta a la base de datos con las opciones de filtrado y paginación
      skip: (page - 1) * limit, // Calcula el número de registros a saltar (offset) para la paginación
      take: limit, // Limita el número de registros a devolver por página
    });
    return { data, total };
  }

  //parte realizada el 18/04
  // Método para obtener un usuario por su ID
  async findOne(id: number): Promise<Usuario | undefined> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } }); // Busca un usuario por su ID
    if (usuario === null) {
      return undefined; // Devuelve undefined si no se encuentra el usuario
    }
    return usuario; // Devuelve el usuario encontrado
  }

  // Método para obtener un usuario por su email
  async findOneByEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } }); // Busca un usuario por su Email
    if (!usuario) {
      return undefined; // Devuelve undefined si no se encuentra el usuario
    }
    return usuario; // Devuelve el usuario encontrado
  }

  // Método para actualizar un usuario
  async update(id: number, userData: Partial<Usuario>): Promise<Usuario | undefined> {
    const updateResult = await this.usuariosRepository.update(id, userData); // Actualiza el usuario con el ID proporcionado

    if (updateResult) { // Verifica si la actualización fue exitosa
      if (updateResult.affected !== undefined && updateResult.affected > 0) { // Verifica si se afectó alguna fila
        const updateUsuario = await this.usuariosRepository.findOne({ where: { id } }); // Obtiene el usuario actualizado
        return updateUsuario || undefined; // Devuelve el usuario actualizado o undefined si no se encuentra
      }
    }
    return undefined; // Si updateResult es undefined o affected no es mayor que 0
  }

  // Método para eliminar un usuario
  async remove(id: number): Promise<void> {
    await this.usuariosRepository.delete(id); // Elimina el usuario con el ID proporcionado
  }
}