import React from 'react';
import Header from '../components/Header'; // Importa el componente Header
import Footer from '../components/Footer'; // Importa el componente Footer
import Button from '../components/ui/button'; // Importa el componente Button
import { motion } from 'framer-motion'; // Importa Framer Motion para animaciones

/**
 * Página de inicio de la aplicación NutriFighters.
 * Muestra una introducción a la aplicación y un llamado a la acción.
 */
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490885486189-324785299650?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
    >
      <Header />
      <main className="container mx-auto flex-grow flex items-center justify-center p-4">
        <motion.div // Añade una animación de aparición
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Bienvenido a NutriFighters
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Tu plataforma para descubrir alimentos saludables, recetas nutritivas y alcanzar tus objetivos de bienestar.
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg" // Mejora el estilo del botón
            onClick={() => { /* TODO: Implementar navegación a la página de recetas */ }}
          >
            Explorar Recetas
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

