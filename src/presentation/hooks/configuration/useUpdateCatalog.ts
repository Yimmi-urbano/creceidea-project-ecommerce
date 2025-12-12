import { useState } from 'react';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';

const useUpdateCatalog = () => {
  const [updating, setUpdating] = useState(false);
  const [currencies, setCurrencies] = useState<{ code: string; symbol: string }[]>([]);

  const updateCatalog = async (catalogo: any) => {
    setUpdating(true);
    try {
      const domain = localStorage.getItem('domainSelect');
      const response = await fetch(`${API_ENDPOINTS.CONFIGURATION}/config/catalogo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          domain: domain || '',
        },
        body: JSON.stringify({ catalogo }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return { success: true, message: 'Catálogo actualizado correctamente' };
    } catch (error) {
      console.error('Error actualizando el catálogo:', error);
      return { success: false, message: 'Ocurrió un error al actualizar el catálogo.' };
    } finally {
      setUpdating(false);
    }
  };

  const getCurrencies = async () => {

    const simulatedCurrencies = [
      { code: 'USD', symbol: '$' },
      { code: 'PEN', symbol: 'S/' },

    ];
    setCurrencies(simulatedCurrencies);
  };

  return { updateCatalog, updating, currencies, getCurrencies };
};

export default useUpdateCatalog;
