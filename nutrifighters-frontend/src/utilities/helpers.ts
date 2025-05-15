/**
 * Formatea un número a un formato de moneda.
 * @param number El número a formatear.
 * @param currency El código de la moneda (por defecto: 'USD').
 * @returns El número formateado como moneda.
 */
export const formatCurrency = (number: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency',
      currency,
    }).format(number);
  };
  
  /**
    * Función para calcular el Indice de Masa Corporal (IMC)
    * @param peso en kg
    * @param altura en metros
    * @returns el IMC calculado con dos decimales de precisión
    */
    export const calcularIMC = (peso: number, altura: number): number => {
      if (altura <= 0) {
        throw new Error("La altura debe ser mayor que cero.");
      }
      const imc = peso / (altura * altura);
      return parseFloat(imc.toFixed(2));
    };
  
  
  /**
   * Valida si una cadena es un email válido.
   * @param email La cadena a validar.
   * @returns Un booleano que indica si la cadena es un email válido.
   */
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };
  
  // Exporta otras funciones de utilidad