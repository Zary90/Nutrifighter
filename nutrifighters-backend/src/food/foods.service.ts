// parte realizada el 12/04

import { Injectable, NotFoundException } from '@nestjs/common'; // Importa el decorador Injectable
import { InjectRepository } from '@nestjs/typeorm'; // Importa el decorador InjectRepository
import { Repository, FindOptionsWhere, Like, MoreThanOrEqual, LessThanOrEqual} from 'typeorm'; // Importa la clase Repository
import { Alimento } from '../entities/food.entities'; // Importa la entidad Alimento

@Injectable() // Marca la clase como un servicio, permitiendo la inyección de dependencias
export class AlimentosService {
  constructor(
    @InjectRepository(Alimento) // Inyecta el repositorio de la entidad Alimento
    private alimentosRepository: Repository<Alimento>, // Declara e inicializa el repositorio
  ) {}

  // Método para crear un nuevo alimento
  async create(alimentoData: Partial<Alimento>): Promise<Alimento> {
    const alimento = this.alimentosRepository.create(alimentoData); // Crea una instancia de Alimento con los datos proporcionados
    return this.alimentosRepository.save(alimento); // Guarda el nuevo alimento en la base de datos y devuelve el resultado
  }
  // creado el 06/05
  // Método para buscar alimentos con opciones de filtrado y paginación
  async findAll(
    nombre?: string, // Parámetro opcional para filtrar por nombre
    categoria?: string, // Parámetro opcional para filtrar por categoría
    caloriasMin?: number, // Parámetro opcional para filtrar por calorías mínimas
    caloriasMax?: number, // Parámetro opcional para filtrar por calorías máximas
    page: number = 1, // Parámetro opcional para la página actual (por defecto: 1)
    limit: number = 10, // Parámetro opcional para el número de resultados por página (por defecto: 10)
  ): Promise<{ data: Alimento[]; total: number }> {
    const where: FindOptionsWhere<Alimento> = {}; // Objeto para construir la condición 'where' de la consulta

    if (nombre) {
      where.nombre = Like(`%${nombre}%`); // Si se proporciona 'nombre', filtra alimentos que contengan ese nombre (LIKE)
    }
    if (categoria) {
      where.categoria = categoria; // Si se proporciona 'categoria', filtra por esa categoría
    }
    if (caloriasMin) {
      where.calorias = MoreThanOrEqual(caloriasMin); // Si se proporciona 'caloriasMin', filtra alimentos con calorías mayores o iguales
    }
    if (caloriasMax) {
      where.calorias = LessThanOrEqual(caloriasMax); // Si se proporciona 'caloriasMax', filtra alimentos con calorías menores o iguales
    }

    const [data, total] = await this.alimentosRepository.findAndCount({ // Realiza la consulta a la base de datos con las opciones de filtrado y paginación
      where, // Aplica la condición 'where' construida
      skip: (page - 1) * limit, // Calcula el número de registros a saltar (offset) para la paginación
      take: limit, // Limita el número de registros a devolver por página
    });

    return { data, total }; // Devuelve un objeto con los datos de los alimentos y el número total de alimentos que coinciden con los criterios
  }

  // parte realizada el 12/04
  // Método para obtener un alimento por su ID
  async findOne(id: number): Promise<Alimento | undefined> {
    const alimento = await this.alimentosRepository.findOne({ where: { id } }); // Busca un alimento por su ID
    if (!alimento) {
      throw new NotFoundException(`Alimento con ID ${id} no encontrado`); // Lanza una excepción NotFoundException si no se encuentra el alimento
    }
    return alimento; // Devuelve el alimento encontrado
  }

  // Método para actualizar un alimento
  async update(id: number, alimentoData: Partial<Alimento>): Promise<Alimento | undefined> {
    const updateResult = await this.alimentosRepository.update(id, alimentoData); // Actualiza el alimento con el ID proporcionado

    if (updateResult && updateResult.affected !== undefined && updateResult.affected > 0) { // Verifica si la actualización fue exitosa (si al menos 1 fila fue afectada)
      const updatedAlimento = await this.alimentosRepository.findOne({ where: { id } }); // Obtiene el alimento actualizado de la base de datos
      return updatedAlimento || undefined; // Devuelve el alimento actualizado si se encuentra, o undefined si no se encuentra
    }

    return undefined; // Devuelve undefined si no se actualizó ninguna fila
  }

  // Método para eliminar un alimento
  async remove(id: number): Promise<void> {
    await this.alimentosRepository.delete(id); // Elimina el alimento con el ID proporcionado
  }
}