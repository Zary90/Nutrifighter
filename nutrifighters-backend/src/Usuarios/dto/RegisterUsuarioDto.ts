// parte realizada el 02/05

// Importa los decoradores de NestJS y Swagger
import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsDate, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  

export class RegisterUsuarioDto {
  @ApiProperty({ description: 'El nombre del usuario' }) // Define la propiedad 'nombre' en el DTO y su descripción para Swagger
  @IsNotEmpty({ message: 'El nombre es requerido' }) // Valida que el campo 'nombre' no esté vacío
  @IsString({ message: 'El nombre debe ser una cadena de texto' }) // Valida que el campo 'nombre' sea una cadena de texto
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' }) // Valida que el campo 'nombre' tenga al menos 2 caracteres
  nombre: string; // Declara la propiedad 'nombre'

  @ApiProperty({ description: 'El email del usuario' }) // Define la propiedad 'email' en el DTO y su descripción para Swagger
  @IsNotEmpty({ message: 'El email es requerido' }) // Valida que el campo 'email' no esté vacío
  @IsEmail({}, { message: 'El email debe ser una dirección de correo electrónico válida' }) // Valida que el campo 'email' sea una dirección de correo electrónico válida
  email: string; // Declara la propiedad 'email'

  @ApiProperty({ description: 'La contraseña del usuario' }) // Define la propiedad 'contrasena' en el DTO y su descripción para Swagger
  @IsNotEmpty({ message: 'La contraseña es requerida' }) // Valida que el campo 'contrasena' no esté vacío
  @IsString({ message: 'La contraseña debe ser una cadena de texto' }) // Valida que el campo 'contrasena' sea una cadena de texto
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' }) // Valida que el campo 'contrasena' tenga al menos 8 caracteres
  contrasena: string; // Declara la propiedad 'contrasena'

  @ApiProperty({ description: 'La fecha de nacimiento del usuario', required: false }) // Define la propiedad 'fechaDeNacimiento' en el DTO y su descripción para Swagger
  @IsOptional() // Indica que este campo es opcional
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' }) // Valida que el campo 'fechaDeNacimiento' sea una fecha válida
  fechaDeNacimiento?: Date; // Declara la propiedad 'fechaDeNacimiento' como opcional

  @ApiProperty({ description: 'La altura del usuario en metros', required: false }) // Define la propiedad 'altura' en el DTO y su descripción para Swagger
  @IsOptional() // Indica que este campo es opcional
  @IsNumber()  // Valida que el campo 'altura' sea un número
  altura?: number; // Declara la propiedad 'altura' como opcional

  @ApiProperty({ description: 'El peso del usuario en kilogramos', required: false }) // Define la propiedad 'peso' en el DTO y su descripción para Swagger
  @IsOptional() // Indica que este campo es opcional
  @IsNumber()  // Valida que el campo 'peso' sea un número
  peso?: number; // Declara la propiedad 'peso' como opcional

  @ApiProperty({ description: 'El sexo del usuario', required: false, enum: ['masculino', 'femenino', 'otro'] }) // Define la propiedad 'sexo' en el DTO y su descripción para Swagger, incluyendo los valores permitidos
  @IsOptional() // Indica que este campo es opcional
  @IsString({ message: 'El sexo debe ser una cadena de texto' }) // Valida que el campo 'sexo' sea una cadena de texto
  sexo?: 'masculino' | 'femenino' | 'otro'; // Declara la propiedad 'sexo' como opcional y restringe sus valores
}
