// parte realizada el 02/05

// Importa los decoradores de NestJS y Swagger
import { IsString, IsNumber, IsNotEmpty, MinLength, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateAlimentoDto {
  @ApiProperty({ description: 'El nombre del alimento' }) // Define la propiedad 'nombre' en el DTO y su descripción para Swagger
  @IsNotEmpty({ message: 'El nombre es requerido' }) // Valida que el campo 'nombre' no esté vacío
  @IsString({ message: 'El nombre debe ser una cadena de texto' }) // Valida que el campo 'nombre' sea una cadena de texto
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' }) // Valida que el campo 'nombre' tenga al menos 2 caracteres
  nombre: string; // Declara la propiedad 'nombre'

  @ApiProperty({ description: 'Las calorías del alimento' }) // Define la propiedad 'calorias' en el DTO y su descripción para Swagger
  @IsNotEmpty({ message: 'Las calorías son requeridas' }) // Valida que el campo 'calorias' no esté vacío
  @IsNumber()  // Valida que el campo 'calorias' sea un número
  calorias: number; // Declara la propiedad 'calorias'

  @ApiProperty({ description: 'Descripción del alimento', required: false }) // Define la propiedad 'descripcion' en el DTO y su descripción para Swagger
  @IsOptional() // Indica que este campo es opcional
  @IsString({ message: 'La descripción debe ser una cadena de texto' }) // Valida que el campo 'descripcion' sea una cadena de texto
  descripcion?: string; // Declara la propiedad 'descripcion' como opcional
}
