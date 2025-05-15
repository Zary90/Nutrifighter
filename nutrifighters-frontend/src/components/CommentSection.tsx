import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Comment {
  id: number;
  userId: number;
  text: string;
}

interface CommentSectionProps {
  recipeId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Lógica para obtener los comentarios del backend
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/recetas/${recipeId}/comentarios`);
        setComments(response.data);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      }
    };

    fetchComments();
  }, [recipeId]);

  const handleAddComment = async () => {
    // Lógica para enviar el nuevo comentario al backend
    try {
      await axios.post(`/recetas/${recipeId}/comentarios`, { text: newComment });
      // Recargar los comentarios después de añadir uno nuevo
      setNewComment('');
    } catch (error) {
      console.error('Error al añadir comentario:', error);
    }
  };
  return (
    <div className="mt-4">
      <h3>Comentarios</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="mb-2 p-2 border rounded-md bg-gray-100">{comment.text}</li>
        ))}
      </ul>
      <div className="flex mt-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Añade un comentario"
          className="w-full border rounded-md p-2 mr-2"
        />
        <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CommentSection;