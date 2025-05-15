import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Si usas React Router
import Header from '../components/Header';
import { Alimento } from '../types';
import Footer from '../components/Footer';

const FoodDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID del alimento de la URL
  const [food, setFood] = useState<Alimento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`/alimentos/${id}`); // Reemplaza con la URL de tu backend
        setFood(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!food) {
    return <div>Alimento no encontrado</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">{food.nombre}</h1>
        <p>Calorías: {food.calorias} kcal</p>
        <p>Proteínas: {food.proteinas} g</p>
        <p>Grasas: {food.grasas} g</p>
        <p>Carbohidratos: {food.carbohidratos} g</p>
        <p>azucar: {food.azucar} g</p> 
        <p>fibra: {food.fibra} g</p> 
      </main>
      <Footer />
    </div>
  );
};

export default FoodDetailPage;
