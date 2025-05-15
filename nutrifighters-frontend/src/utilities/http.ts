import axios from 'axios';

const API_BASE_URL = '/api'; // Define la URL base de tu API

/**
 * Realiza una petición GET a la API.
 * @param url La URL relativa al endpoint de la API.
 * @param config Opciones adicionales para la petición (opcional).
 * @returns Una promesa con la respuesta de la API.
 */
export const get = async (url: string, config?: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`, config);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error; // Lanza el error de la respuesta o el error original
  }
};

/**
 * Realiza una petición POST a la API.
 * @param url La URL relativa al endpoint de la API.
 * @param data Los datos a enviar en el cuerpo de la petición.
 * @param config Opciones adicionales para la petición (opcional).
 * @returns Una promesa con la respuesta de la API.
 */
export const post = async (url: string, data: any, config?: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data, config);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// Exporta otras funciones para otros métodos HTTP (put, delte, etc.)
