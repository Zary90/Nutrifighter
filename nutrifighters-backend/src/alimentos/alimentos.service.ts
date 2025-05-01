// parte realizada el 12/04

import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable
import { InjectRepository } from '@nestjs/typeorm'; // Importa el decorador InjectRepository
import { Repository } from 'typeorm'; // Importa la clase Repository
import { Alimento } from '../entidades/alimentos.entidad'; // Importa la entidad Alimento

@Injectable() // Marca la clase como un servicio y permite la inyeccion de dependencias
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
 

// Método para buscar un alimento
  async findAll(): Promise<Alimento[]> {
    return this.alimentosRepository.find(); // Obtiene todos los alimentos de la base de datos
  }


// Método para obtener un alimento por su ID
  async findOne(id: number): Promise<Alimento | undefined> {
    const alimento = await this.alimentosRepository.findOne({ where: { id } }); // Busca un alimento por su ID
    if (alimento === null) {
      return undefined; // Devuelve undefined si no se encuentra el alimento
    }
    return alimento; // Devuelve el alimento encontrado

  }


// Método para actualizar un alimento
  async update(id: number, alimentoData: Partial<Alimento>): Promise<Alimento | undefined> {
    const updateResult = await this.alimentosRepository.update(id, alimentoData); // Actualiza el alimento con el ID proporcionado

    if (updateResult) {  // Verifica si la actualización fue exitosa
      if (updateResult.affected !== undefined && updateResult.affected > 0) { // Verifica si afecto a alguna fila
        const updatedAlimento = await this.alimentosRepository.findOne({ where: { id } }); // Obtiene el alimento actualizado
        return updatedAlimento || undefined; // Devuelve el alimento actualizado o undefined si no se encuentra
      }
    }

    return undefined; // Si updateResult es undefined o affected no es mayor que 0
  }

// Método para eliminar un alimento
  async remove(id: number): Promise<void> {
    await this.alimentosRepository.delete(id); // Elimina el alimento con el ID proporcionado
  }
}