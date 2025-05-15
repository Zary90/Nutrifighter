import React, { useState } from 'react';

interface RatingProps {
  recipeId: number;
  currentRating: number | null; // Permitir null
  onRatingChange: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ recipeId, currentRating }) => {
  const [rating, setRating] = useState(currentRating);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    // Lógica para enviar la calificación al backend
    console.log(`Calificando receta ${recipeId} con ${newRating}`);
  };

  return (
     <div>
      {[1, 2, 3, 4, 5].map(value => (
        <button key={value} onClick={() => handleRatingClick(value)} className={rating !== null && value <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </button>
      ))}
    </div>
  );
};

export default Rating;