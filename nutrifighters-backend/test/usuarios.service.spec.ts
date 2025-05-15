// parte realizada 03/05

import { Test, TestingModule } from '@nestjs/testing'; // Importa las clases necesarias para las pruebas de NestJS
import { UsuariosService } from '../src/Usuarios/usuarios.service'; // Importa el servicio que se va a probar
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa la función para obtener el token del repositorio
import { Repository } from 'typeorm'; // Importa la clase Repository de TypeORM
import { Usuario } from '../src/entidades/usuario.entity'; // Importa la entidad Usuario

describe('UsuariosService', () => { // Define un bloque de pruebas para el servicio UsuariosService
  let service: UsuariosService; // Declara una variable para almacenar una instancia del servicio
  let usuariosRepository: Repository<Usuario>; // Declara una variable para almacenar una instancia simulada del repositorio

  beforeEach(async () => { // Define un bloque que se ejecuta antes de cada prueba dentro de este 'describe'
    const module: TestingModule = await Test.createTestingModule({ // Crea un módulo de prueba simulado
      providers: [
        UsuariosService, // Incluye el servicio que se va a probar
        {
          provide: getRepositoryToken(Usuario), // Proporciona un mock del repositorio de Usuario
          useValue: { // Define el comportamiento simulado del repositorio
            create: jest.fn().mockResolvedValue({}), // Simula el método create del repositorio
            save: jest.fn().mockResolvedValue({}), // Simula el método save del repositorio
            find: jest.fn().mockResolvedValue([]), // Simula el método find del repositorio
            findOne: jest.fn().mockResolvedValue({}), // Simula el método findOne del repositorio
            update: jest.fn().mockResolvedValue({ affected: 1 } as any), // Simula el método update del repositorio
            delete: jest.fn().mockResolvedValue({}), // Simula el método delete del repositorio
          },
        },
      ],
    }).compile(); // Compila el módulo de prueba

    service = module.get<UsuariosService>(UsuariosService); // Obtiene una instancia del servicio UsuariosService del módulo de prueba
    usuariosRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario)); // Obtiene una instancia simulada del repositorio de Usuario
  });

  it('should be defined', () => { // Define una prueba individual
    expect(service).toBeDefined(); // Afirma que el servicio está definido
  });

  it('should create a new usuario', async () => { // Define una prueba para el método create del servicio
    const userData: Partial<Usuario> = { nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password' }; // Datos de un nuevo usuario
    const usuarioMock: Usuario = { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date()}; // Usuario mock
    jest.spyOn(usuariosRepository, 'create').mockReturnValue(usuarioMock); // Simula el método create del repositorio para que devuelva el usuarioMock
    jest.spyOn(usuariosRepository, 'save').mockResolvedValue(usuarioMock); // Simula el método save del repositorio para que devuelva el usuarioMock

    await service.create(userData); // Llama al método create del servicio
    expect(usuariosRepository.create).toHaveBeenCalledWith(userData); // Afirma que el método create del repositorio fue llamado con los datos correctos
    expect(usuariosRepository.save).toHaveBeenCalledWith(usuarioMock); // Afirma que el método save del repositorio fue llamado con el usuarioMock
  });

  it('should return all usuarios', async () => { // Define una prueba para el método findAll del servicio
    const usuariosMock: Usuario[] = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() },
      { id: 2, nombre: 'María García', email: 'maria@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 160, peso: 60, sexo: 'femenino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() },
    ]; // Datos de usuarios de prueba
    jest.spyOn(usuariosRepository, 'find').mockResolvedValue(usuariosMock); // Simula el método find del repositorio para que devuelva los usuariosMock

    const result = await service.findAll(); // Llama al método findAll del servicio
    expect(usuariosRepository.find).toHaveBeenCalled(); // Afirma que el método find del repositorio fue llamado
    expect(result).toEqual(usuariosMock); // Afirma que el resultado es igual a los usuariosMock
  });

  it('should return one usuario by id', async () => { // Define una prueba para el método findOne del servicio
    const usuarioMock: Usuario = { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() }; // Datos de un usuario de prueba
    jest.spyOn(usuariosRepository, 'findOne').mockResolvedValue(usuarioMock); // Simula el método findOne del repositorio para que devuelva el usuarioMock

    const result = await service.findOne(1); // Llama al método findOne del servicio
    expect(usuariosRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } }); // Afirma que el método findOne del repositorio fue llamado con el ID correcto
    expect(result).toEqual(usuarioMock); // Afirma que el resultado es igual al usuarioMock
  });

  it('should return one usuario by email', async () => { // Define una prueba para el método findOneByEmail del servicio
    const email = 'juan@example.com';
    const usuarioMock: Usuario = { id: 1, nombre: 'Juan Pérez', email: email, contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() };
    jest.spyOn(usuariosRepository, 'findOne').mockResolvedValue(usuarioMock);

    const result = await service.findOneByEmail(email);
    expect(usuariosRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    expect(result).toEqual(usuarioMock);
  });

  it('should update a usuario', async () => { // Define una prueba para el método update del servicio
    const id = 1;
    const userData: Partial<Usuario> = { nombre: 'Juan Pérez Actualizado', email: 'juan.actualizado@example.com' }; // Datos actualizados del usuario
    const updatedUsuarioMock: Usuario = { id: 1, nombre: 'Juan Pérez Actualizado', email: 'juan.actualizado@example.com', contrasena: 'password', fechaDeNacimiento: new Date(), altura: 180, peso: 80, sexo: 'masculino', rol: 'usuario', fechaDeCreacion: new Date(), fechaDeActualizacion: new Date() }; // Usuario mock actualizado
    jest.spyOn(usuariosRepository, 'update').mockResolvedValue({ affected: 1 } as any); // Simula el método update del repositorio para que devuelva un objeto con affected: 1
    jest.spyOn(usuariosRepository, 'findOne').mockResolvedValue(updatedUsuarioMock); // Simula el método findOne del repositorio para que devuelva el updatedUsuarioMock

    const result = await service.update(id, userData); // Llama al método update del servicio
    expect(usuariosRepository.update).toHaveBeenCalledWith(id, userData); // Afirma que el método update del repositorio fue llamado con los datos correctos
    expect(usuariosRepository.findOne).toHaveBeenCalledWith({ where: { id } }); // Afirma que el método findOne del repositorio fue llamado con el ID correcto
    expect(result).toEqual(updatedUsuarioMock); // Afirma que el resultado es igual al updatedUsuarioMock
  });

  it('should delete a usuario', async () => { // Define una prueba para el método remove del servicio
    const id = 1;
    await service.remove(id); // Llama al método remove del servicio
    expect(usuariosRepository.delete).toHaveBeenCalledWith(id); // Afirma que el método delete del repositorio fue llamado con el ID correcto
  });
});
