// creado el 05/05

import { Injectable, NestMiddleware, Logger } from '@nestjs/common'; // Importa las clases necesarias de NestJS
import { Request, Response, NextFunction } from 'express'; // Importa las interfaces de Express para manejar las peticiones y respuestas

@Injectable() // Marca la clase como un Middleware, permitiendo que NestJS lo gestione
export class ErrorLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('ErrorLogger'); // Crea una instancia del Logger de NestJS, con el contexto 'ErrorLogger'

  use(req: Request, res: Response, next: NextFunction) { // Implementa el método use de la interfaz NestMiddleware, que se ejecuta para cada petición
    res.on('finish', () => { // Registra un listener para el evento 'finish' de la respuesta.  Este evento se emite cuando la respuesta se ha enviado completamente al cliente.
      if (res.statusCode >= 400) { // Comprueba si el código de estado de la respuesta indica un error (400 o superior)
        const message = `${req.method} ${req.url} - ${res.statusCode} - ${res.statusMessage}`; // Crea un mensaje de error detallado que incluye el método HTTP, la URL, el código de estado y el mensaje de estado
        this.logger.error(message); // Registra el mensaje de error utilizando el Logger de NestJS
      }
    });
    next(); // Llama a la siguiente función middleware en la cadena.  Es esencial para que la petición continúe su procesamiento.
  }
}