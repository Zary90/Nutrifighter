import { Injectable } from '@nestjs/common';// Importa el decorador Injectable
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable() 
export class AppService { // Marca la clase como un servicio, 
// lo que permite que NestJS la gestione e inyecte como dependencia en otras clases
  getHello(): string {  // Define un método llamado getHello que devuelve un string
    return 'Hello World!'; // Devuelve el string "Hello World!"
  }
}
