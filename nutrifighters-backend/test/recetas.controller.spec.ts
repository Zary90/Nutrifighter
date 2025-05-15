// parte realizada el 03/05

import { Test, TestingModule } from '@nestjs/testing'; // Importa las clases necesarias para las pruebas de NestJS
import { INestApplication } from '@nestjs/common'; // Importa la interfaz INestApplication
import * as request from 'supertest'; // Importa la librería supertest para hacer peticiones HTTP
import { AppModule } from '../src/app.module'; // Importa el AppModule
import { RecetasService } from '../src/recetas/recetas.service'; // Importa el servicio RecetasService
import { Receta } from '../src/entidades/receta.entity'; // Importa la entidad Receta

describe('RecetasController (E2E)', () => { // Define un bloque de pruebas para el controlador RecetasController (pruebas End-to-End)
  let app: INestApplication; // Declara una variable para almacenar la instancia de la aplicación NestJS
  let recetasService: RecetasService; // Declara una variable para almacenar la instancia del servicio RecetasService

  beforeEach(async () => { // Define un bloque que se ejecuta antes de cada prueba
    const moduleFixture: TestingModule = await Test.createTestingModule({ // Crea un módulo de prueba
      imports: [AppModule], // Importa el AppModule para las pruebas de integración
    }).compile(); // Compila el módulo de prueba

    app = moduleFixture.createNestApplication(); // Crea una instancia de la aplicación NestJS
    await app.init(); // Inicializa la aplicación NestJS
    recetasService = moduleFixture.get<RecetasService>(RecetasService); // Obtiene una instancia del servicio RecetasService del módulo de prueba
  });

  it('/recetas (POST)', async () => { // Define una prueba para el endpoint POST /recetas
    const recetaData = { titulo: 'Pasta Carbonara', instrucciones: 'Mezclar...' }; // Define los datos de una nueva receta
    const recetaMock: Receta = { 
        id: 1, 
        titulo: 'Pasta Carbonara', 
        descripcion: '',  // Provide default or mock values for the missing properties
        instrucciones: 'Mezclar...',
        imagenUrl: '',
        tiempoDePreparacion: 0,
        tiempoDeCoccion: 0,
        porciones: 0,
        categoria: '',
        ingredientes: [],
    };
    jest.spyOn(recetasService, 'create').mockResolvedValue(recetaMock); // Simula el método create del servicio para que devuelva la recetaMock

    return request(app.getHttpServer()) // Utiliza supertest para hacer una petición POST al servidor
      .post('/recetas') // Envía la petición POST a la ruta /recetas
      .send(recetaData) // Envía los datos de la receta en el cuerpo de la petición
      .expect(201) // Espera que el código de estado de la respuesta sea 201 (Created)
      .expect(recetaMock); // Espera que el cuerpo de la respuesta sea la recetaMock
  });
});
