// parte realizada 03/05

import { Test, TestingModule } from '@nestjs/testing'; // Importa las clases necesarias para las pruebas de NestJS
import { INestApplication } from '@nestjs/common'; // Importa la interfaz INestApplication, que representa una aplicación NestJS
import * as request from 'supertest'; // Importa la librería supertest para hacer peticiones HTTP en las pruebas
import { AppModule } from '../src/app.module'; // Importa el AppModule, que es el módulo raíz de la aplicación
import { UsuariosService } from '../src/Usuarios/usuarios.service'; // Importa el servicio UsuariosService
import { Usuario } from '../src/entidades/usuario.entity'; // Importa la entidad Usuario

describe('UsuariosController (E2E)', () => { // Define un bloque de pruebas para el controlador UsuariosController (pruebas End-to-End)
  let app: INestApplication; // Declara una variable para almacenar la instancia de la aplicación NestJS
  let usuariosService: UsuariosService; // Declara una variable para almacenar la instancia del servicio UsuariosService

  beforeEach(async () => { // Define un bloque que se ejecuta antes de cada prueba dentro de este 'describe'
    const moduleFixture: TestingModule = await Test.createTestingModule({ // Crea un módulo de prueba simulado
      imports: [AppModule], // Importa el AppModule para las pruebas de integración. Esto carga toda la aplicación.
    }).compile(); // Compila el módulo de prueba

    app = moduleFixture.createNestApplication(); // Crea una instancia de la aplicación NestJS para las pruebas
    await app.init(); // Inicializa la aplicación NestJS. Esto es necesario para que esté lista para recibir peticiones.
    usuariosService = moduleFixture.get<UsuariosService>(UsuariosService); // Obtiene una instancia del servicio UsuariosService del módulo de prueba.
  });

  it('/usuarios (POST)', async () => { // Define una prueba para el endpoint POST /usuarios (crear un nuevo usuario)
    const userData = { nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password' }; // Define los datos de un nuevo usuario que se enviarán en la petición
    const usuarioMock: Usuario = { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date()}; // Define un mock del usuario que se espera que devuelva el servicio
    jest.spyOn(usuariosService, 'create').mockResolvedValue(usuarioMock); // Simula el método create del servicio para que devuelva el usuarioMock

    return request(app.getHttpServer()) // Utiliza supertest para hacer una petición HTTP al servidor de la aplicación
      .post('/usuarios') // Envía una petición POST a la ruta /usuarios
      .send(userData) // Envía los datos del usuario en el cuerpo de la petición
      .expect(201) // Espera que el código de estado de la respuesta sea 201 (Created)
      .expect({ ...userData, id: 1 }); // Espera que el cuerpo de la respuesta coincida con el usuarioMock (omitimos las fechas para simplificar la comparación)
  });

  it('/usuarios (GET)', async () => { // Define una prueba para el endpoint GET /usuarios (obtener todos los usuarios)
    const usuariosMock: Usuario[] = [ // Define un array de usuarios mock que se espera que devuelva el servicio
      { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() },
      { id: 2, nombre: 'María García', email: 'maria@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 160, peso: 60, sexo: 'femenino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() },
    ];
    jest.spyOn(usuariosService, 'findAll').mockResolvedValue(usuariosMock); // Simula el método findAll del servicio para que devuelva el array de usuarios mock

    return request(app.getHttpServer()) // Utiliza supertest para hacer una petición HTTP al servidor
      .get('/usuarios') // Envía una petición GET a la ruta /usuarios
      .expect(200) // Espera que el código de estado de la respuesta sea 200 (OK)
      .expect(usuariosMock); // Espera que el cuerpo de la respuesta coincida con el array de usuarios mock
  });

  it('/usuarios/:id (GET)', async () => { // Define una prueba para el endpoint GET /usuarios/:id (obtener un usuario por ID)
    const usuarioMock = { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() }; // Define un usuario mock
    jest.spyOn(usuariosService, 'findOne').mockResolvedValue(usuarioMock); // Simula el método findOne del servicio para que devuelva el usuario mock

    return request(app.getHttpServer()) // Utiliza supertest para hacer una petición HTTP al servidor
      .get('/usuarios/1') // Envía una petición GET a la ruta /usuarios/1 (para obtener el usuario con ID 1)
      .expect(200) // Espera que el código de estado de la respuesta sea 200 (OK)
      .expect(usuarioMock); // Espera que el cuerpo de la respuesta coincida con el usuario mock
  });

  it('/usuarios/:id (PUT)', async () => { // Define una prueba para el endpoint PUT /usuarios/:id (actualizar un usuario)
    const id = '1'; // Define el ID del usuario que se va a actualizar
    const userData: Partial<Usuario> = { nombre: 'Juan Pérez Actualizado', email: 'juan.actualizado@example.com' }; // Define los datos actualizados del usuario
    const updatedUsuarioMock: Usuario = { id: 1, nombre: 'Juan Pérez Actualizado', email: 'juan.actualizado@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() }; // Define el usuario mock actualizado
    jest.spyOn(usuariosService, 'update').mockResolvedValue(updatedUsuarioMock); // Simula el método update del servicio para que devuelva el usuario mock actualizado

    return request(app.getHttpServer()) // Utiliza supertest para hacer una petición HTTP al servidor
      .put('/usuarios/1') // Envía una petición PUT a la ruta /usuarios/1
      .send(userData) // Envía los datos actualizados del usuario en el cuerpo de la petición
      .expect(200) // Espera que el código de estado de la respuesta sea 200 (OK)
      .expect(updatedUsuarioMock); // Espera que el cuerpo de la respuesta coincida con el usuario mock actualizado
  });

  it('/usuarios/:id (DELETE)', async () => { // Define una prueba para el endpoint DELETE /usuarios/:id (eliminar un usuario)
    const id = '1'; // Define el ID del usuario que se va a eliminar
    jest.spyOn(usuariosService, 'remove').mockResolvedValue(undefined); // Simula el método remove del servicio para que no devuelva nada

    return request(app.getHttpServer()) // Utiliza supertest para hacer una petición HTTP al servidor
      .delete('/usuarios/1') // Envía una petición DELETE a la ruta /usuarios/1
      .expect(200); // Espera que el código de estado de la respuesta sea 200 (OK)
  });
});