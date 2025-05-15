import { Controller, Get } from '@nestjs/common'; // Importa los decoradores de NestJS
import { AppService } from './app.service'; // Importa el servicio AppService

@Controller() // Define que esta clase es un controlador.  El controlador maneja las peticiones HTTP a rutas específicas.
export class AppController {
  constructor(private readonly appService: AppService) {} // Inyecta el servicio AppService en el constructor.  Esto permite usar la lógica del servicio en este controlador.

  @Get() // Define un endpoint GET para la ruta raíz ('/')
  getHello(): string { // Define un método llamado getHello que se ejecuta cuando se recibe una petición GET a la ruta raíz
    return this.appService.getHello(); // Llama al método getHello del servicio AppService y devuelve el resultado
  }
}
