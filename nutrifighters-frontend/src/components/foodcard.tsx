import React from 'react';

// Define una interfaz para el tipo de dato Alimento.  Esto mejora la mantenibilidad y la legibilidad.
interface Alimento {
  id: number;
  nombre: string;
  calorias: number;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  azucar: number;
  fibra: number;
  porcion: string;
  fuente: string; // Fuente de donde se obtuvo la información nutricional
  
}

interface FoodCardProps {
  food: Alimento;
}

/**
 * Componente para mostrar la información de un alimento.
 * @param {FoodCardProps} props - Las propiedades del componente.
 * @returns {JSX.Element} - Un elemento de tarjeta que muestra los detalles del alimento.
 */
const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105"> {/* Añade una transición y un efecto de hover */}
      <h3 className="text-xl font-semibold text-green-600 mb-2">{food.nombre}</h3> {/* Usa una clase de color semántico */}
      <div className="grid grid-cols-2 gap-2 text-gray-700">  {/* Mejora la estructura con un grid */}
        <div>
          <p><span className="font-medium">Calorías:</span></p>
          <p><span className="font-medium">Proteínas:</span></p>
          <p><span className="font-medium">Grasas:</span></p>
          <p><span className="font-medium">Carbohidratos:</span></p>
          <p><span className="font-medium">Azucar:</span></p>
          <p><span className="font-medium">Fibra:</span></p>
          <p><span className="font-medium">Porcion:</span></p>
          <p><span className="font-medium">Fuente:</span></p>
        </div>
        <div>
          <p>{food.calorias} kcal</p>
          <p>{food.proteinas} g</p>
          <p>{food.grasas} g</p>
          <p>{food.carbohidratos} g</p>
          <p>{food.azucar} g</p>
          <p>{food.fibra} g</p>
          <p>{food.porcion} g</p>
          <p>{food.fuente} g</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;