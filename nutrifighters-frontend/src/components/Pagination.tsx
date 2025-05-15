import React from 'react';

interface PaginationProps {
  currentPage: number; // Página actual
  totalPages: number; // Número total de páginas
  onPageChange: (page: number) => void; // Función para manejar el cambio de página
}

/**
 * Componente para mostrar la paginación de una lista de elementos.
 * @param {PaginationProps} props - Las propiedades del componente.
 * @returns {JSX.Element} - Un conjunto de botones para navegar entre las páginas.
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = []; // Array para almacenar los números de página que se van a mostrar
  const visiblePages = 5; // Número de páginas visibles en la paginación
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2)); // Calcula la primera página visible
  let endPage = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2)); // Calcula la última página visible

  // Ajusta el rango de páginas visibles
  if (totalPages <= visiblePages) { // Si el número total de páginas es menor o igual al número de páginas visibles
    startPage = 1; // Muestra todas las páginas
    endPage = totalPages;
  } else if (startPage <= 3) { // Si la página inicial está cerca del principio
    endPage = visiblePages; // Muestra las primeras 'visiblePages' páginas
  } else if (endPage >= totalPages - 2) { // Si la página final está cerca del final
    startPage = totalPages - visiblePages + 1; // Muestra las últimas 'visiblePages' páginas
  }

  for (let i = startPage; i <= endPage; i++) { // Genera un array con los números de las páginas visibles
    pages.push();
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4"> {/* Contenedor principal para los botones de paginación */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))} // Llama a la función onPageChange con la página anterior
        disabled={currentPage === 1} // Deshabilita el botón "Anterior" si está en la primera página
        className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100" // Estilos del botón
      >
       Anterior
      </button>
      {startPage > 1 && ( // Muestra el botón "1" y los puntos suspensivos si no es la primera página
        <>
          <button
            onClick={() => onPageChange(1)} // Llama a onPageChange con la primera página
            className="px-3 py-1 rounded-md bg-white text-gray-800 hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>} {/* Muestra puntos suspensivos si hay más páginas antes de la primera visible */}
        </>
      )}
      {pages.map(page => ( // Mapea el array de números de página para generar los botones de página
        <button
          key={page} // Clave única para cada botón de página
          onClick={() => onPageChange(page)} // Llama a onPageChange con el número de página correspondiente
          className={
            currentPage === page
              ? "px-3 py-1 rounded-md bg-green-500 text-white" // Estilos para la página actual
              : "px-3 py-1 rounded-md bg-white text-gray-800 hover:bg-gray-100" // Estilos para las demás páginas
          }
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && ( // Muestra el botón de la última página y los puntos suspensivos si no es la última página visible
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}  {/* Puntos suspensivos si hay mas paginas despues de la ultima visible */}
          <button
            onClick={() => onPageChange(totalPages)} // Llama a onPageChange con la última página
            className="px-3 py-1 rounded-md bg-white text-gray-800 hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} // Llama a onPageChange con la página siguiente
        disabled={currentPage === totalPages} // Deshabilita el botón "Siguiente" si está en la última página
        className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;

