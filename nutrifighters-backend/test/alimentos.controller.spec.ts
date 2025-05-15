// parte realizada el 03/05

import { Test, TestingModule } from '@nestjs/testing'; // Importa las clases necesarias para las pruebas de NestJS
import { INestApplication } from '@nestjs/common'; // Importa la interfaz INestApplication
import * as request from 'supertest'; // Importa la librería supertest para hacer peticiones HTTP
import { AppModule } from '../src/app.module'; // Importa el módulo principal de la aplicación
import { AlimentosService } from '../src/alimentos/alimentos.service'; // Importa el servicio AlimentosService
import { Alimento } from '../src/entidades/alimentos.entidad'; // Importa la entidad Alimento
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AlimentosController (E2E)', () => { // Define un bloque de pruebas para el controlador AlimentosController (pruebas End-to-End)
  let app: INestApplication; // Declara una variable para almacenar la instancia de la aplicación NestJS
  let alimentosService: AlimentosService; // Declara una variable para almacenar una instancia del servicio AlimentosService
  let alimentoRepository: Repository<Alimento>;

  beforeEach(async () => { // Define un bloque que se ejecuta antes de cada prueba dentro de este 'describe'
    const moduleFixture: TestingModule = await Test.createTestingModule({ // Crea un módulo de prueba
      imports: [AppModule], // Importa el módulo principal de la aplicación para las pruebas de integración
    }).compile(); // Compila el módulo de prueba

    app = moduleFixture.createNestApplication(); // Crea una instancia de la aplicación NestJS para las pruebas
    await app.init(); // Inicializa la aplicación
    alimentosService = moduleFixture.get<AlimentosService>(AlimentosService); // Obtiene una instancia del servicio AlimentosService del módulo de prueba
    alimentoRepository = moduleFixture.get<Repository<Alimento>>(getRepositoryToken(Alimento));
  });

  it('/alimentos (POST)', async () => { // Define una prueba para el endpoint POST /alimentos
    const alimentoData = { nombre: 'Manzana', calorias: 50 }; // Define los datos de un nuevo alimento
    const alimentoMock: Alimento = { id: 1, nombre: 'Manzana', calorias: 50, descripcion: '', categoria: '', UnidadDeMedida: '', proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0, recetas: [] };
    jest.spyOn(alimentosService, 'create').mockResolvedValue(alimentoMock); // Simula el método create del servicio para que devuelva el alimentoMock

    return request(app.getHttpServer()) // Utiliza supertest para hacer una petición POST al servidor
      .post('/alimentos') // Envía la petición POST a la ruta /alimentos
      .send(alimentoData) // Envía los datos del alimento en el cuerpo de la petición
      .expect(201) // Espera que el código de estado de la respuesta sea 201 (Created)
      .expect(alimentoMock); // Espera que el cuerpo de la respuesta sea el alimentoMock
  });
});