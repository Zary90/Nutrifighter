// parte realizada 03/05

import { Test, TestingModule } from '@nestjs/testing'; // Importa las clases necesarias para las pruebas de NestJS
import { RecetasService } from '../src/recetas/recetas.service'; // Importa el servicio que se va a probar
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa la función para obtener el token del repositorio
import { Repository } from 'typeorm'; // Importa la clase Repository de TypeORM
import { Receta } from '../src/entidades/receta.entity'; // Importa la entidad Receta
import { Alimento } from '../src/entidades/alimentos.entidad'; // Importa la entidad Alimento

describe('RecetasService', () => { // Define un bloque de pruebas para el servicio RecetasService
  let service: RecetasService; // Declara una variable para almacenar una instancia del servicio
  let recetasRepository: Repository<Receta>; // Declara una variable para almacenar una instancia simulada del repositorio de Receta
  let alimentosRepository: Repository<Alimento>; // Declara una variable para almacenar una instancia simulada del repositorio de Alimento

  beforeEach(async () => { // Define un bloque que se ejecuta antes de cada prueba dentro de este 'describe'
    const module: TestingModule = await Test.createTestingModule({ // Crea un módulo de prueba simulado
      providers: [
        RecetasService, // Incluye el servicio que se va a probar
        {
          provide: getRepositoryToken(Receta), // Proporciona un mock del repositorio de Receta
          useValue: { // Define el comportamiento simulado del repositorio de Receta
            create: jest.fn().mockReturnValue({}), // Simula el método create del repositorio
            save: jest.fn().mockResolvedValue({}), // Simula el método save del repositorio
            find: jest.fn().mockResolvedValue([]), // Simula el método find del repositorio
            findOne: jest.fn().mockResolvedValue({}), // Simula el método findOne del repositorio
            update: jest.fn().mockResolvedValue({ affected: 1 } as any), // Simula el método update del repositorio
            delete: jest.fn().mockResolvedValue({}), // Simula el método delete del repositorio
          },
        },
        { // Añade un mock para el repositorio de Alimento
          provide: getRepositoryToken(Alimento),
          useValue: {
            findOne: jest.fn().mockResolvedValue({}), // Simula el método findOne del repositorio de Alimento
          },
        },
      ],
    }).compile(); // Compila el módulo de prueba

    service = module.get<RecetasService>(RecetasService); // Obtiene una instancia del servicio RecetasService del módulo de prueba
    recetasRepository = module.get<Repository<Receta>>(getRepositoryToken(Receta)); // Obtiene una instancia simulada del repositorio de Receta
    alimentosRepository = module.get<Repository<Alimento>>(getRepositoryToken(Alimento)); // Obtiene una instancia simulada del repositorio de Alimento
  });

  it('should be defined', () => { // Define una prueba individual
    expect(service).toBeDefined(); // Afirma que el servicio está definido
  });

  it('should create a new receta', async () => { // Define una prueba para el método create del servicio
    const recetaData: Partial<Receta> = { titulo: 'Pasta Carbonara', instrucciones: 'Mezclar...' }; // Datos de una nueva receta (DTO)
    const recetaMock: Receta = { 
        id: 1, 
        titulo: 'Pasta Carbonara', 
        descripcion: '',  // Proporciona valores por defecto o simulados para las propiedades faltantes
        instrucciones: 'Mezclar...',
        imagenUrl: '',
        tiempoDePreparacion: 0,
        tiempoDeCoccion: 0,
        porciones: 0,
        categoria: '',
        ingredientes: [],
    }; // Receta mock
    jest.spyOn(recetasRepository, 'create').mockReturnValue(recetaMock); // Simula el método create del repositorio para que devuelva la recetaMock
    jest.spyOn(recetasRepository, 'save').mockResolvedValue(recetaMock); // Simula el método save del repositorio para que devuelva el recetaMock


    await service.create(recetaData); // Llama al método create del servicio
    expect(recetasRepository.create).toHaveBeenCalledWith(recetaData); // Afirma que el método create del repositorio fue llamado con los datos correctos
    expect(recetasRepository.save).toHaveBeenCalledWith(recetaMock); // Afirma que el método save del repositorio fue llamado con la recetaMock
  });

  it('should return all recetas', async () => { // Define una prueba para el método findAll del servicio
    const recetasMock: Receta[] = [
      { id: 1, titulo: 'Pasta Carbonara', instrucciones: 'Mezclar...', ingredientes: [], descripcion: '', imagenUrl: '', tiempoDePreparacion: 0, tiempoDeCoccion: 0, porciones: 0, categoria: '' },
      { id: 2, titulo: 'Ensalada César', instrucciones: 'Lavar...', ingredientes: [], descripcion: '', imagenUrl: '', tiempoDePreparacion: 0, tiempoDeCoccion: 0, porciones: 0, categoria: ''},
    ]; // Array de recetas mock
    jest.spyOn(recetasRepository, 'find').mockResolvedValue(recetasMock); // Simula el método find del repositorio para que devuelva el array de recetas mock

    const result = await service.findAll(); // Llama al método findAll del servicio
    expect(recetasRepository.find).toHaveBeenCalledWith({ relations: ['ingredientes'] }); // Afirma que el método find del repositorio fue llamado con la opción 'relations'
    expect(result).toEqual(recetasMock); // Afirma que el resultado es igual al array de recetas mock
  });

  it('should return one receta by id', async () => { // Define una prueba para el método findOne del servicio
    const recetaMock: Receta =  { id: 1, titulo: 'Pasta Carbonara', instrucciones: 'Mezclar...', ingredientes: [], descripcion: '', imagenUrl: '', tiempoDePreparacion: 0, tiempoDeCoccion: 0, porciones: 0, categoria: '' }; // Receta mock
    jest.spyOn(recetasRepository, 'findOne').mockResolvedValue(recetaMock); // Simula el método findOne del repositorio para que devuelva la receta mock

    const result = await service.findOne(1); // Llama al método findOne del servicio
    expect(recetasRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['ingredientes'] }); // Afirma que el método findOne del repositorio fue llamado con el ID correcto y la opción 'relations'
    expect(result).toEqual(recetaMock); // Afirma que el resultado es igual a la receta mock
  });

  it('should update a recipe', async () => { // Define una prueba para el método update del servicio
    const id = 1;
    const recetaData: Partial<Receta> = { titulo: 'Pasta Carbonara Actualizada', instrucciones: 'Mezclar bien...' }; // Datos actualizados de la receta (DTO)
    const updatedRecetaMock: Receta = { 
        id, 
        titulo: 'Pasta Carbonara Actualizada', 
        instrucciones: 'Mezclar bien...',
        descripcion: '',  // Provide default or mock values for the missing properties
        imagenUrl: '',
        tiempoDePreparacion: 0,
        tiempoDeCoccion: 0,
        porciones: 0,
        categoria: '',
        ingredientes: [],
    }; // Receta mock actualizada
    jest.spyOn(recetasRepository, 'update').mockResolvedValue({ affected: 1 } as any); // Simula el método update del repositorio para que devuelva un objeto con affected: 1
    jest.spyOn(recetasRepository, 'findOne').mockResolvedValue(updatedRecetaMock); // Simula el método findOne del repositorio para que devuelva el updatedRecetaMock

    const result = await service.update(id, recetaData); // Llama al método update del servicio
    expect(recetasRepository.update).toHaveBeenCalledWith(id, recetaData); // Afirma que el método update del repositorio fue llamado con los datos correctos
    expect(recetasRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['ingredientes'] }); // Afirma que el método findOne del repositorio fue llamado con el ID correcto y la opción 'relations'
    expect(result).toEqual(updatedRecetaMock); // Afirma que el resultado es igual al updatedRecetaMock
  });

  it('should delete a recipe', async () => { // Define una prueba para el método remove del servicio
    const id = 1;
    await service.remove(id); // Llama al método remove del servicio
    expect(recetasRepository.delete).toHaveBeenCalledWith(id); // Afirma que el método delete del repositorio fue llamado con el ID correcto
  });

  it('should add an ingredient to a recipe', async () => { // Define la prueba para addIngredienteToReceta
      const recetaId = 1;
      const alimentoId = 2;
      const recetaMock: Receta = {
        id: recetaId,
        titulo: 'Pasta Carbonara', 
        instrucciones: 'Mezclar...', 
        ingredientes: [],
        descripcion: '',  
        imagenUrl: '',
        tiempoDePreparacion: 0,
        tiempoDeCoccion: 0,
        porciones: 0,
        categoria: '',
    };
      const alimentoMock: Alimento = { 
        id: alimentoId,
        nombre: 'Queso',  // Provide default or mock values for the missing properties
        descripcion: '',
        categoria: '',
        UnidadDeMedida: '',
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0,
        fibra: 0,
        recetas: [],
    };

      jest.spyOn(recetasRepository, 'findOne').mockResolvedValue(recetaMock);
      jest.spyOn(alimentosRepository, 'findOne').mockResolvedValue(alimentoMock);
      jest.spyOn(recetasRepository, 'save').mockResolvedValue(recetaMock);

      const result = await service.addIngredienteToReceta(recetaId, alimentoId);

      expect(recetasRepository.findOne).toHaveBeenCalledWith({ where: { id: recetaId }, relations: ['ingredientes'] });
      expect(alimentosRepository.findOne).toHaveBeenCalledWith({ where: { id: alimentoId } });
      expect(recetaMock.ingredientes).toContain(alimentoMock);
      expect(recetasRepository.save).toHaveBeenCalledWith(recetaMock);
      expect(result).toEqual(recetaMock);
  });

  it('should remove an ingredient from a recipe', async () => {  // Define la prueba para removeIngredienteFromReceta
      const recetaId = 1;
      const alimentoId = 2;
      const recetaMock: Receta = { 
          id: recetaId,
          titulo: 'Pasta Carbonara', 
          instrucciones: 'Mezclar...', 
          ingredientes: [{ 
              id: alimentoId,        
              nombre: 'Queso',  // Provide default or mock values for the missing properties
              descripcion: '',
              categoria: '',
              UnidadDeMedida: '',
              calorias: 0,
              proteinas: 0,
              grasas: 0,
              carbohidratos: 0,
              fibra: 0,
              recetas: [] }],
          descripcion: '',  
          imagenUrl: '',
          tiempoDePreparacion: 0,
          tiempoDeCoccion: 0,
          porciones: 0,
          categoria: '',
      }; // Inicializa con el ingrediente a eliminar

      jest.spyOn(recetasRepository, 'findOne').mockResolvedValue(recetaMock);
      jest.spyOn(recetasRepository, 'save').mockResolvedValue(recetaMock);

      const result = await service.removeIngredienteFromReceta(recetaId, alimentoId);

      expect(recetasRepository.findOne).toHaveBeenCalledWith({ where: { id: recetaId }, relations: ['ingredientes'] });
      expect(recetaMock.ingredientes).toEqual([]); // Verifica que el ingrediente se eliminó
      expect(recetasRepository.save).toHaveBeenCalledWith(recetaMock);
      expect(result).toEqual(recetaMock);
  });
});
