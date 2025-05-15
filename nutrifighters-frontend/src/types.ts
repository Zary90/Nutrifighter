export interface Alimento {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    UnidadDeMedida: string;
    calorias: number;
    proteinas: number;
    grasas: number;
    carbohidratos: number;
    fibra: number;
    azucar: number;
    porcion: string;
    fuente: string;
    recetas: Receta[]; // Relación con Receta
    
  }
  
  export interface Receta {
    id: number;
    titulo: string;
    descripcion: string;
    instrucciones: string;
    imagenUrl?: string;
    tiempoDePreparacion: number;
    tiempoDeCoccion: number;
    porciones: number;
    categoria: string;
    ingredientes: Alimento[]; // Relación con Alimento
    calificaciones?: number[];
    // ...otros detalles...
  }
  