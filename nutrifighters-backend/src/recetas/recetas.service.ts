// parte realizada el 15/04

import { Injectable, NotFoundException } from '@nestjs/common'; // Importa Injectable y NotFoundException
import { InjectRepository } from '@nestjs/typeorm'; // Importa InjectRepository
import { Repository } from 'typeorm'; // Importa la clase Repository
import { Receta } from '../entidades/receta.entity'; // Importa la entidad Receta
import { Alimento } from '../entidades/alimentos.entidad'; // Importa la entidad Alimento

@Injectable() // Marca la clase como un servicio
export class RecetasService {
  constructor(
    @InjectRepository(Receta) // Inyecta el repositorio de la entidad Receta
    private recetasRepository: Repository<Receta>, // Declara e inicializa el repositorio de Receta
    @InjectRepository(Alimento) // Inyecta el repositorio de la entidad Alimento
    private alimentosRepository: Repository<Alimento>, // Declara e inicializa el repositorio de Alimento
  ) {}

  // Método para crear una nueva receta
  async create(recetaData: Partial<Receta>): Promise<Receta> {
    const receta = this.recetasRepository.create(recetaData); // Crea una instancia de Receta
    return this.recetasRepository.save(receta); // Guarda la receta en la base de datos y la devuelve
  }
   //Realizado el 06/05
  // Método para obtener todas las recetas
  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Receta[]; total: number }> {
    const [data, total] = await this.recetasRepository.findAndCount({ // Realiza la consulta a la base de datos con las opciones de filtrado y paginación
      relations: ['ingredientes'], // Carga la relación con ingredientes, importante para las recetas
      skip: (page - 1) * limit, // Calcula el número de registros a saltar (offset) para la paginación
      take: limit, // Limita el número de registros a devolver por página
    });
    return { data, total };
  }
  
  // parte realizada el 15/04
  // Método para obtener una receta por su ID
  async findOne(id: number): Promise<Receta | undefined> {
    const receta = await this.recetasRepository.findOne({ where: { id }, relations: ['ingredientes'] }); // Busca una receta por su ID y carga la relación 'ingredientes'
    if (!receta) {
      return undefined; // Devuelve undefined si no se encuentra la receta
    }
    return receta; // Devuelve la receta encontrada
  }

  // Método para actualizar una receta
  async update(id: number, recetaData: Partial<Receta>): Promise<Receta | undefined> {
    const updateResult = await this.recetasRepository.update(id, recetaData); // Actualiza la receta con el ID proporcionado

    if (updateResult?.affected && updateResult.affected > 0) { // Verifica si la actualización fue exitosa
      const updatedReceta = await this.recetasRepository.findOne({ where: { id }, relations: ['ingredientes'] }); // Obtiene la receta actualizada con la relación 'ingredientes'
      return updatedReceta || undefined; // Devuelve la receta actualizada o undefined si no se encuentra
    }
    return undefined; // Si updateResult es undefined o affected no es mayor que 0
  }

  // Método para eliminar una receta
  async remove(id: number): Promise<void> {
    await this.recetasRepository.delete(id); // Elimina la receta con el ID proporcionado
  }

  // Método para añadir un ingrediente a una receta específica
  async addIngredienteToReceta(recetaId: number, alimentoId: number): Promise<Receta> {
    const receta = await this.recetasRepository.findOne({ where: { id: recetaId }, relations: ['ingredientes'] }); // Busca la receta por ID y carga sus ingredientes
    const alimento = await this.alimentosRepository.findOne({ where: { id: alimentoId } }); // Busca el alimento por ID

    if (!receta) {
      throw new NotFoundException(`Receta con ID ${recetaId} no encontrada`); // Lanza NotFoundException si no se encuentra la receta
    }
    if (!alimento) {
      throw new NotFoundException(`Alimento con ID ${alimentoId} no encontrado`); // Lanza NotFoundException si no se encuentra el alimento
    }

    // Verifica si el ingrediente ya existe en la receta
    if (!receta.ingredientes.find(ingrediente => ingrediente.id === alimentoId)) {
      receta.ingredientes.push(alimento); // Añade el alimento a la lista de ingredientes de la receta
      await this.recetasRepository.save(receta); // Guarda la receta actualizada
    }
    return receta; // Devuelve la receta actualizada
  }

  // Método para eliminar un ingrediente de una receta específica
  async removeIngredienteFromReceta(recetaId: number, alimentoId: number): Promise<Receta> {
    const receta = await this.recetasRepository.findOne({ where: { id: recetaId }, relations: ['ingredientes'] }); // Busca la receta por ID y carga sus ingredientes

    if (!receta) {
      throw new NotFoundException(`Receta con ID ${recetaId} no encontrada`); // Lanza NotFoundException si no se encuentra la receta
    }

    // Filtra los ingredientes para eliminar el que coincide con el alimentoId
    receta.ingredientes = receta.ingredientes.filter(ingrediente => ingrediente.id !== alimentoId);
    await this.recetasRepository.save(receta); // Guarda la receta actualizada
    return receta; // Devuelve la receta actualizada
  }
}


