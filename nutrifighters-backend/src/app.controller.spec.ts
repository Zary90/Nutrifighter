// creado el 05/05

import { Test, TestingModule } from '@nestjs/testing'; // Importa las clases necesarias para las pruebas de NestJS
import { AppController } from './app.controller'; // Importa el controlador que se va a probar
import { AppService } from './app.service'; // Importa el servicio que utiliza el controlador
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('AppController', () => { // Define un bloque de pruebas para el controlador AppController
  let appController: AppController; // Declara una variable para almacenar una instancia del controlador

  beforeEach(async () => { // Define un bloque que se ejecuta antes de cada prueba dentro de este 'describe'
    const app: TestingModule = await Test.createTestingModule({ // Crea un módulo de prueba simulado
      controllers: [AppController], // Declara qué controladores se van a incluir en el módulo de prueba
      providers: [AppService], // Declara qué proveedores (servicios) se van a incluir en el módulo de prueba
    }).compile(); // Compila el módulo de prueba

    appController = app.get<AppController>(AppController); // Obtiene una instancia del controlador AppController del módulo de prueba
  });

  describe('root', () => { // Define un bloque de pruebas para la ruta raíz ('/')
    it('should return "Hello World!"', () => { // Define una prueba individual
      expect(appController.getHello()).toBe('Hello World!'); // Afirma que el método getHello del controlador devuelve el string "Hello World!"
    });
  });
});
