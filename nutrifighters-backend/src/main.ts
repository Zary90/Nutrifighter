// parte realizada el 02/05

import { NestFactory, NestApplication } from '@nestjs/core'; // Importa NestFactory y NestApplication desde @nestjs/core
import { AppModule } from './app.module'; // Importa el módulo raíz de la aplicación
import { ValidationPipe } from '@nestjs/common'; // Importa ValidationPipe desde @nestjs/common para la validación de datos
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Importa las clases de Swagger desde @nestjs/swagger para la documentación de la API

// parte realizada el 05/05
import { HttpExceptionFilter } from './common/filters/http-exception.filter'; // Importa el filtro de excepción personalizado

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule); // Crea una instancia de la aplicación NestJS y la asigna a la variable 'app'

  // parte realizada el 05/05
  app.useGlobalFilters(new HttpExceptionFilter()); // Aplica el filtro de excepción personalizado globalmente para manejar las excepciones HTTP

  await app.listen(3000); // Inicia el servidor en el puerto 3000

  // parte realizada el 02/05
  app.useGlobalPipes(new ValidationPipe({ // Configura ValidationPipe como un pipe global para la validación automática de datos
    whitelist: true, // Remueve las propiedades no definidas en los DTOs
    transform: true, // Transforma los payloads de las peticiones al tipo definido en los DTOs
  }));

  const config = new DocumentBuilder() // Crea una instancia de DocumentBuilder para configurar la documentación de Swagger
    .setTitle('NutriFighters API') // Establece el título de la API en la documentación de Swagger
    .setDescription('API para la aplicación NutriFighters') // Establece la descripción de la API en la documentación de Swagger
    .setVersion('1.0') // Establece la versión de la API en la documentación de Swagger
    .build(); // Construye la configuración de Swagger
  const document = SwaggerModule.createDocument(app, config); // Crea el documento de Swagger a partir de la aplicación y la configuración
  SwaggerModule.setup('api-docs', app, document); // Configura Swagger para servir la documentación en la ruta '/api-docs'

  await app.listen(process.env.PORT || 3000); // Inicia el servidor en el puerto especificado por la variable de entorno PORT o en el puerto 3000 por defecto
}

bootstrap(); // Llama a la función bootstrap para iniciar la aplicación