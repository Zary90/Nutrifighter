// parte realizada el 02/05

// Importa los decoradores de NestJS y Swagger
import { IsString, IsArray, IsNumber, IsOptional, MinLength } from 'class-validator'; 
import { ApiProperty } from '@nestjs/swagger'; 

export class UpdateRecetaDto {
  @ApiProperty({ description: 'El título de la receta', required: false }) // Define la propiedad 'titulo' en el DTO
  @IsOptional() // Indica que este campo es opcional
  @IsString({ message: 'El título debe ser una cadena de texto' }) // Valida que sea una cadena de texto
  @MinLength(2, { message: 'El título debe tener al menos 2 caracteres' }) // Valida la longitud mínima
  titulo?: string; // Declara la propiedad 'titulo' como opcional

  @ApiProperty({ description: 'La descripción de la receta', required: false }) // Define la propiedad 'descripcion' en el DTO
  @IsOptional() // Indica que este campo es opcional
  @IsString({ message: 'La descripción debe ser una cadena de texto' }) // Valida que sea una cadena de texto
  descripcion?: string; // Declara la propiedad 'descripcion' como opcional

  @ApiProperty({ description: 'Las instrucciones de la receta', required: false }) // Define la propiedad 'instrucciones' en el DTO
  @IsOptional() // Indica que este campo es opcional
  @IsString({ message: 'Las instrucciones deben ser una cadena de texto' }) // Valida que sea una cadena de texto
  instrucciones?: string; // Declara la propiedad 'instrucciones' como opcional

  @ApiProperty({ description: 'Los ingredientes de la receta (IDs de alimentos)', required: false }) // Define la propiedad 'ingredientes' en el DTO
  @IsOptional() // Indica que este campo es opcional
  @IsArray({ message: 'Los ingredientes deben ser un array de IDs de alimentos' }) // Valida que sea un array
  @IsNumber({}, { each: true, message: 'Cada ID de ingrediente debe ser un número' }) // Valida que cada elemento del array sea un número
  ingredientes?: number[]; // Declara la propiedad 'ingredientes' como opcional
}
