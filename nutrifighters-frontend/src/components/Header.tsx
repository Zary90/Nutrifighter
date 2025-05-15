import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde React Router para la navegación

interface HeaderProps {
  title?: string; // Prop opcional para el título del encabezado, con valor por defecto
}

/**
 * Componente de cabecera para la aplicación NutriFighters.
 * Muestra la barra de navegación principal con enlaces a las diferentes secciones.
 */
const Header: React.FC<HeaderProps> = ({ title = "NutriFighters" }) => {
  return (
    <header className="bg-green-600 text-white py-4 shadow-md"> {/* Usa clases de Tailwind para estilos */}
      <div className="container mx-auto flex justify-between items-center px-4"> {/* Centra el contenido y añade padding horizontal */}
        <h1 className="text-xl font-bold text-white">{title}</h1> {/* Estilos del título */}
        <nav>
          <ul className="flex space-x-6"> {/* Espaciado entre los enlaces */}
            <li>
              <Link to="/" className="hover:text-green-200 transition-colors duration-200">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/alimentos" className="hover:text-green-200 transition-colors duration-200">
                Alimentos
              </Link>
            </li>
            <li>
              <Link to="/recetas" className="hover:text-green-200 transition-colors duration-200">
                Recetas
              </Link>
            </li>
             <li>
              <Link to="/login" className="hover:text-green-200 transition-colors duration-200">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-200 transition-colors duration-200">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
