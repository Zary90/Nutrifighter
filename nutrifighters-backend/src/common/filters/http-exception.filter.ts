// parte realizada el 05/05

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'; // Importa las clases necesarias de NestJS
import { Request, Response } from 'express'; // Importa las interfaces de Express para manejar las peticiones y respuestas

@Catch(HttpException) // Este decorador indica que este filtro captura excepciones de tipo HttpException
export class HttpExceptionFilter implements ExceptionFilter { // Implementa la interfaz ExceptionFilter
  catch(exception: HttpException, host: ArgumentsHost) { // Método requerido por la interfaz ExceptionFilter para manejar la excepción
    const ctx = host.switchToHttp(); // Obtiene el contexto de la solicitud HTTP
    const response = ctx.getResponse<Response>(); // Obtiene el objeto Response de Express
    const request = ctx.getRequest<Request>(); // Obtiene el objeto Request de Express
    const status = exception.getStatus(); // Obtiene el código de estado HTTP de la excepción

    response.status(status).json({ // Establece el código de estado de la respuesta y envía una respuesta JSON
      statusCode: status, // Incluye el código de estado en la respuesta JSON
      timestamp: new Date().toISOString(), // Incluye la fecha y hora del error en formato ISO string
      path: request.url, // Incluye la URL de la solicitud en la respuesta JSON
      message: exception.message, // Incluye el mensaje de la excepción en la respuesta JSON
    });
  }
}
