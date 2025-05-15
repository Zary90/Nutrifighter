import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import { Alimento } from '../types'; // Importa la interfaz Alimento
import Footer from '../components/Footer';

const FoodListPage = () => {
  const [foods, setFoods] = useState<Alimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Para almacenar el número total de páginas
  const limit = 10; // Define el número de alimentos por página

  const fetchFoods = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/alimentos?page=${currentPage}&limit=${limit}`); // Reemplaza con la URL de tu backend
      setFoods(response.data.data); // Suponiendo que tu backend devuelve { data: Alimento[], total: number }
      setTotalPages(Math.ceil(response.data.total / limit)); // Calcula el número total de páginas
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods(page);
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-grow">
        <h1 className="text-3xl font-bold mb-4">Lista de Alimentos</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foods.map(food => (
            <li key={food.id}>
              <FoodCard food={food} />
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default FoodListPage;
