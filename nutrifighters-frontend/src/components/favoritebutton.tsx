import React from 'react';

interface FavoriteButtonProps {
  recipeId: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ recipeId, isFavorite }) => {
  const handleFavoriteClick = () => {
    // Lógica para enviar la petición al backend para guardar/eliminar de favoritos
    console.log(`Toggle favorito para receta ${recipeId}`);
  };

  return (
    <button onClick={handleFavoriteClick}>
      {isFavorite ? 'Eliminar de Favoritos' : 'Guardar en Favoritos'}
    </button>
  );
};

export default FavoriteButton;