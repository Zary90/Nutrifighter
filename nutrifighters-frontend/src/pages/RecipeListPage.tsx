import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard'; // Importa el componente RecipeCard (importación por defecto)
import Header from '../components/Header'; // Importa el componente Header
import Footer from '../components/Footer'; // Importa el componente Footer
import Pagination from '../components/Pagination'; // Importa el componente Pagination
import { Receta } from '../types'; // Importa la interfaz Receta, asegúrate de que la ruta es correcta
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Importa el componente Alert de Shadcn o una librería similar
import { Skeleton } from "@/components/ui/skeleton" // Importa el componente Skeleton de Shadcn


interface RecipeListPageProps {
  // No se definen props para este componente, así que lo dejamos vacío
}

/**
 * Página para mostrar una lista de recetas paginada.
 * Obtiene los datos del backend y los muestra en una lista de tarjetas.
 */
const RecipeListPage: React.FC<RecipeListPageProps> = () => {
  const [recipes, setRecipes] = useState<Receta[]>([]); // Estado para almacenar la lista de recetas
  const [loading, setLoading] = useState(true); // Estado para indicar si se están cargando los datos
  const [error, setError] = useState<Error | null>(null); // Estado para almacenar cualquier error que ocurra
  const [page, setPage] = useState(1); // Estado para la página actual, inicializado en 1
  const [totalPages, setTotalPages] = useState(0); // Estado para el número total de páginas
  const limit = 10; // Define el número de recetas por página

  // Función para obtener las recetas del backend
  const fetchRecipes = async (currentPage: number) => {
    setLoading(true); // Establece el estado de carga a true antes de la petición
    try {
      const response = await axios.get(`/recetas?page=${currentPage}&limit=${limit}`); // Reemplaza con la URL de tu backend
      setRecipes(response.data.data); // Suponiendo que el backend devuelve un objeto con las propiedades 'data' y 'total'
      setTotalPages(Math.ceil(response.data.total / limit)); // Calcula el número total de páginas
    } catch (err: any) {
      setError(err); // Almacena el error en el estado de error
    } finally {
      setLoading(false); // Establece el estado de carga a false después de la petición, independientemente del resultado
    }
  };

  // Efecto para obtener las recetas cuando cambia la página
  useEffect(() => {
    fetchRecipes(page);
  }, [page, limit]); // Dependencia del efecto: page y limit

  // Función para manejar el cambio de página
  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Actualiza el estado de la página actual
  };

  // Manejo de la carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-8 h-8 rounded-full animate-spin" /> {/* Usa un Skeleton para indicar la carga */}
      </div>
    );
  }

  // Manejo de errores
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription> {/* Muestra el mensaje de error al usuario */}
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> {/* Estilos Flexbox para la página */}
      <Header />
      <main className="container mx-auto flex-grow py-8"> {/* Contenedor principal con margen automático y relleno */}
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">Lista de Recetas</h1> {/* Título de la página */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid para mostrar las tarjetas de recetas */}
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />  {/* Renderiza el componente RecipeCard para cada receta */}
            </li>
          ))}
        </ul>
        <Pagination  // Componente de paginación reutilizable
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default RecipeListPage;
