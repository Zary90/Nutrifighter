// parte realizada el 12/04

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Receta } from './recipe.entity';

@Entity(({ name: 'alimentos' })) // Define la entidad y el nombre de la tabla en la base de datos
export class Alimento {
  @PrimaryGeneratedColumn()  // Define la columna 'id' como clave primaria y autoincremental
  id: number;

 // Definicion de varias columnas para dar propiedades a los alimentos

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;
  
  @Column({ type: 'text', nullable: true })
  descripcion:string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  categoria:string;

  @Column({ type: 'varchar', length: 50, nullable: true }) 
  UnidadDeMedida: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  calorias: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  proteinas: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  grasas: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  carbohidratos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fibra:number;

  @ManyToMany(() => Receta, (receta) => receta.ingredientes) // Define la relación ManyToMany con la entidad Receta
  //  Un alimento puede estar en muchas recetas
  recetas: Receta[]; 
}
