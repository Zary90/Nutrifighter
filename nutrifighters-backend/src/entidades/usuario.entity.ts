//parte realizada el 18/04
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'usuarios' }) // Define la entidad y el nombre de la tabla en la base de datos
export class Usuario {
  @PrimaryGeneratedColumn() // Define la columna 'id' como clave primaria y autoincremental
  id: number;

  // Definicion de varias columnas para dar propiedades a los alimentos
  
  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  contrasena: string;

  @Column({ type: 'date', nullable: true })
  fechaDeNacimiento: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  altura: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  peso: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sexo: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  rol: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaDeCreacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  fechaDeActualizacion: Date;

}  