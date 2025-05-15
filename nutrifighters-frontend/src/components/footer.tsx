import React from 'react';

/**
 * Componente de pie de página para la aplicación.
 * Muestra información de derechos de autor y enlaces importantes.
 * @returns {JSX.Element} - El elemento del pie de página.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8"> {/* Estilos con Tailwind CSS */}
      <div className="container mx-auto flex justify-center items-center flex-col sm:flex-row gap-4 px-4"> {/* Contenedor centrado y flexible */}
        <p>© {new Date().getFullYear()} NutriFighters. Todos los derechos reservados.</p>
        <div className="flex space-x-4">
          <a href="/aviso-legal" className="hover:text-gray-200 transition-colors"> {/* Enlace con estilo de hover */}
            Aviso Legal
          </a>
          <a href="/politica-de-privacidad" className="hover:text-gray-200 transition-colors">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
