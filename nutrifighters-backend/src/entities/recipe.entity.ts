// parte realizada el 15/04

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, } from 'typeorm';
import { Alimento } from '../entities/food.entities'; //Importacion de entidad alimento


@Entity({ name: 'recetas' }) // Define la entidad y el nombre de la tabla en la base de datos
export class Receta {
  @PrimaryGeneratedColumn() // Define la columna 'id' como clave primaria y autoincremental
  id: number;

  // Definicion de varias columnas para dar propiedades a los alimentos

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text' })
  instrucciones: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagenUrl: string;

  // Define la relación ManyToMany con la entidad alimento
  // Un alimento puede estar en muchas recetas 

  @ManyToMany(() => Alimento, (alimento) => alimento.recetas)
  @JoinTable({
    name: 'receta_alimentos',
    joinColumn: { name: 'receta_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'alimento_id', referencedColumnName: 'id' },
  })
  ingredientes: Alimento[];

  @Column({ type: 'int', nullable: true })
  tiempoDePreparacion: number;

  @Column({ type: 'int', nullable: true })
  tiempoDeCoccion: number;

  @Column({ type: 'int', nullable: true })
  porciones: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  categoria: string;
}

