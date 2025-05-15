import React from 'react';

// Define una interfaz para el tipo de dato Receta.  Esto mejora la mantenibilidad y la legibilidad.
interface Receta {
  id: number;
  titulo: string;
  descripcion: string;
  tiempoDePreparacion: number;
  tiempoDeCoccion: number;
  ingredientes: { id: number; nombre: string }[]; // Array de ingredientes (simplificado)
  imagenUrl: string; // URL de la imagen de la receta (opcional)
  dificultad: 'Fácil' | 'Media' | 'Difícil';
  porciones: number;
  calificaciones: number[]; // Array de calificaciones de los usuarios (opcional)
}

interface RecipeCardProps {
  recipe: Receta;
}

/**
 * Componente para mostrar la información de una receta.
 * @param {RecipeCardProps} props - Las propiedades del componente.
 * @returns {JSX.Element} - Un elemento de tarjeta que muestra los detalles de la receta.
 */
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const promedioCalificaciones = recipe.calificaciones && recipe.calificaciones.length > 0
  ? recipe.calificaciones.reduce((a, b) => a + b, 0) / recipe.calificaciones.length
  : 0;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 group"> {/* Añade transición y efecto hover */}
      {recipe.imagenUrl && (
        <img
          src={recipe.imagenUrl}
          alt={recipe.titulo}
          className="w-full h-48 object-cover rounded-t-lg" // Estilos para la imagen
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-orange-600 mb-2 group-hover:text-orange-800 transition-colors">  {/* Usa clase de color semántico y transición */}
          {recipe.titulo}
        </h3>
        <p className="text-gray-700 mb-2 line-clamp-2">{recipe.descripcion}</p>  {/* Limita la descripción a 2 líneas */}
        <div className="flex justify-between text-sm text-gray-500 mt-2"> {/* Estilos para la información de tiempo */}
          <span>Preparación: {recipe.tiempoDePreparacion} min</span>
          <span>Cocción: {recipe.tiempoDeCoccion} min</span>
          </div>
          <p className="text-gray-600 mt-2">
          Dificultad: <span className="font-medium">{recipe.dificultad}</span>
        </p>
        <p className="text-gray-600">
          Porciones: <span className="font-medium">{recipe.porciones}</span>
        </p>
        {recipe.calificaciones && recipe.calificaciones.length > 0 && (
          <p className="text-gray-600 mt-2">
            Calificación: <span className="font-medium">{promedioCalificaciones.toFixed(1)} / 5</span>
          </p>
        )}
        <div className="mt-4">
          <h4 className="text-md font-semibold text-gray-900">Ingredientes:</h4>
          <ul className="list-disc list-inside">
            {recipe.ingredientes.map(ingrediente => (
              <li key={ingrediente.id} className="text-gray-700">
                {ingrediente.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;