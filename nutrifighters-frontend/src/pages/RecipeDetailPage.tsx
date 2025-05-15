import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Receta } from '../types';
import FavoriteButton from '../components/favoritebutton'; // Asegúrate de que la casing del archivo sea correcta
import Rating from '../components/Rating'; // Asegúrate de que la casing del archivo sea correcta
import CommentSection from '../components/CommentSection'; // Asegúrate de que la casing del archivo sea correcta

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Receta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFavorite, setIsFavorite] = useState(false); // Inicializa el estado
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/recetas/${id}`);
        setRecipe(response.data);
        // Aquí podrías hacer una llamada para verificar si la receta es favorita
        // y obtener la calificación actual del usuario para esta receta
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleToggleFavorite = () => { // Define la función
    setIsFavorite(!isFavorite);
    console.log(`Toggling favorito para receta ${id}, ahora es ${!isFavorite}`);
    // await axios.post(`/recetas/${id}/favoritos`, {});
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log(`Calificando receta ${id} con ${newRating}`);
    // await axios.post(`/recetas/${id}/calificaciones`, { rating: newRating });
  };

  if (loading) {
    return <div>Cargando receta</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!recipe) {
    return <div>Receta no encontrada</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{recipe.titulo}</h1>
          {/* Componente para guardar en favoritos */}
          <FavoriteButton recipeId={recipe.id} isFavorite={isFavorite} onFavoriteToggle={handleToggleFavorite} />
        </div>
        <p>{recipe.descripcion}</p>
        <p>Tiempo de Preparación: {recipe.tiempoDePreparacion} minutos</p>
        <p>Tiempo de Cocción: {recipe.tiempoDeCoccion} minutos</p>

        {/* Componente para mostrar y permitir calificar la receta */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Calificación:</h2>
          <Rating recipeId={recipe.id} currentRating={rating} onRatingChange={handleRatingChange} />
        </div>

        <h2 className="text-2xl font-semibold mt-4">Ingredientes:</h2>
        <ul>
          {recipe.ingredientes?.map(ingrediente => (
            <li key={ingrediente.id}>{ingrediente.nombre}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-4">Instrucciones:</h2>
        <p>{recipe.instrucciones}</p>

        {/* Componente para mostrar y añadir comentarios */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Comentarios:</h2>
          <CommentSection recipeId={recipe.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;