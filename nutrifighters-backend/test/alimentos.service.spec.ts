// parte realizada el 03/05

import { Test, TestingModule } from '@nestjs/testing'; // Importa las clases necesarias para las pruebas de NestJS
import { AlimentosService } from '../src/alimentos/alimentos.service'; // Importa el servicio que se va a probar
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa la función para obtener el token del repositorio
import { Repository } from 'typeorm'; // Importa la clase Repository de TypeORM
import { Alimento } from '../src/entidades/alimentos.entidad'; // Importa la entidad Alimento

describe('AlimentosService', () => { // Define un bloque de pruebas para el servicio AlimentosService
  let service: AlimentosService; // Declara una variable para almacenar una instancia del servicio
  let alimentoRepository: Repository<Alimento>; // Declara una variable para almacenar una instancia simulada del repositorio

  beforeEach(async () => { // Define un bloque que se ejecuta antes de cada prueba dentro de este 'describe'
    const module: TestingModule = await Test.createTestingModule({ // Crea un módulo de prueba simulado
      providers: [
        AlimentosService, // Incluye el servicio que se va a probar
        {
          provide: getRepositoryToken(Alimento), // Proporciona un mock del repositorio de Alimento
          useValue: { // Define el comportamiento simulado del repositorio
            create: jest.fn().mockReturnValue({}), // Simula el método create del repositorio
            save: jest.fn().mockResolvedValue({}), // Simula el método save del repositorio
            find: jest.fn().mockResolvedValue([]), // Simula el método find del repositorio
            findOne: jest.fn().mockResolvedValue({}), // Simula el método findOne del repositorio
            update: jest.fn().mockResolvedValue({ affected: 1 } as any), // Simula el método update del repositorio
            delete: jest.fn().mockResolvedValue({}), // Simula el método delete del repositorio
          },
        },
      ],
    }).compile(); // Compila el módulo de prueba

    service = module.get<AlimentosService>(AlimentosService); // Obtiene una instancia del servicio AlimentosService del módulo de prueba
    alimentoRepository = module.get<Repository<Alimento>>(getRepositoryToken(Alimento)); // Obtiene una instancia simulada del repositorio de Alimento
  });

  it('should be defined', () => { // Define una prueba individual
    expect(service).toBeDefined(); // Afirma que el servicio está definido
  });

  it('should create a new alimento', async () => { // Define una prueba para el método create del servicio
    const alimentoData: Partial<Alimento> = { nombre: 'Manzana', calorias: 50, descripcion: '', categoria: '', UnidadDeMedida: '', proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0 }; // Datos de un nuevo alimento
    const alimentoMock: Alimento = {
      id: 1,
      nombre: 'Manzana',
      calorias: 50,
      descripcion: '',
      categoria: '',
      UnidadDeMedida: '',
      proteinas: 0,
      grasas: 0,
      carbohidratos: 0,
      fibra: 0,
      recetas: [] // Añadido recetas: []
    };
    jest.spyOn(alimentoRepository, 'create').mockReturnValue(alimentoMock); // Simula el método create del repositorio para que devuelva el alimentoMock
    jest.spyOn(alimentoRepository, 'save').mockResolvedValue(alimentoMock); // Simula el método save del repositorio para que devuelva el alimentoMock

    await service.create(alimentoData); // Llama al método create del servicio
    expect(alimentoRepository.create).toHaveBeenCalledWith(alimentoData); // Afirma que el método create del repositorio fue llamado con los datos correctos
    expect(alimentoRepository.save).toHaveBeenCalledWith(alimentoMock); // Afirma que el método save del repositorio fue llamado con el alimentoMock
  });

  it('should return all alimentos', async () => { // Define una prueba para el método findAll del servicio
    const alimentosMock: Alimento[] = [
      { id: 1, nombre: 'Manzana', calorias: 50, descripcion: '', categoria: '', UnidadDeMedida: '', proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0, recetas: [] },
      { id: 2, nombre: 'Plátano', calorias: 90, descripcion: '', categoria: '', UnidadDeMedida: '', proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0, recetas: [] },
    ]; // Datos de alimentos de prueba
    jest.spyOn(alimentoRepository, 'find').mockResolvedValue(alimentosMock); // Simula el método find del repositorio para que devuelva los alimentosMock

    const result = await service.findAll(); // Llama al método findAll del servicio
    expect(alimentoRepository.find).toHaveBeenCalled(); // Afirma que el método find del repositorio fue llamado
    expect(result).toEqual(alimentosMock); // Afirma que el resultado es igual a los alimentosMock
  });

  it('should return one alimento by id', async () => { // Define una prueba para el método findOne del servicio
    const alimentoMock: Alimento = { id: 1, nombre: 'Manzana', calorias: 50, descripcion: '', categoria: '', UnidadDeMedida: '', proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0, recetas: [] }; // Datos de un alimento de prueba
    jest.spyOn(alimentoRepository, 'findOne').mockResolvedValue(alimentoMock); // Simula el método findOne del repositorio para que devuelva el alimentoMock

    const result = await service.findOne(1); // Llama al método findOne del servicio
    expect(alimentoRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } }); // Afirma que el método findOne del repositorio fue llamado con el ID correcto
    expect(result).toEqual(alimentoMock); // Afirma que el resultado es igual al alimentoMock
  });

  it('should update an alimento', async () => { // Define una prueba para el método update del servicio
    const id = 1;
    const alimentoData = { nombre: 'Manzana Actualizada', calorias: 60, descripcion: '', categoria: '', UnidadDeMedida: '', proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0 }; // Datos actualizados del alimento
    const updatedAlimentoMock: Alimento = { id, ...alimentoData, recetas: [] }; // Mock del alimento actualizado
    jest.spyOn(alimentoRepository, 'update').mockResolvedValue({ affected: 1 } as any); // Simula el método update del repositorio para que devuelva un objeto con affected: 1
    jest.spyOn(alimentoRepository, 'findOne').mockResolvedValue(updatedAlimentoMock); // Simula el método findOne del repositorio para que devuelva el updatedAlimentoMock

    const result = await service.update(id, alimentoData); // Llama al método update del servicio
    expect(alimentoRepository.update).toHaveBeenCalledWith(id, alimentoData); // Afirma que el método update del repositorio fue llamado con los datos correctos
    expect(alimentoRepository.findOne).toHaveBeenCalledWith({ where: { id } }); // Afirma que el método findOne del repositorio fue llamado con el ID correcto
    expect(result).toEqual(updatedAlimentoMock); // Afirma que el resultado es igual al updatedAlimentoMock
  });

  it('should delete an alimento', async () => { // Define una prueba para el método remove del servicio
    const id = 1;
    await service.remove(id); // Llama al método remove del servicio
    expect(alimentoRepository.delete).toHaveBeenCalledWith(id); // Afirma que el método delete del repositorio fue llamado con el ID correcto
  });
});