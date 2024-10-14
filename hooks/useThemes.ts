import { useState, useEffect } from 'react';

interface Theme {
  _id: string;
  title: string;
  type_theme: string;
  name: string;
  images: string[];
  category: string;
  status: boolean;
  url_demo: string;
  price: number;
  sale_price: number;
}

export const useThemes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null); // string primitivo o null
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null); // Estado para saber si la actualización fue exitosa

  // Función para obtener los temas desde la API
  const fetchThemes = async () => {
    try {
      const response = await fetch('https://api-theme.creceidea.pe/api/themes');
      const data = await response.json();
      setThemes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los temas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  // Función para actualizar el theme en la API
  const updateTheme = async (themeName: string | null) => {
    try {
      const domain = localStorage.getItem('domainSelect') || 'donguston.creceidea.pe';
      console.log('Enviando actualización a la API con theme:', themeName);

      const response = await fetch('https://api-configuration.creceidea.pe/api/config/theme', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'domain': domain,
        },
        body: JSON.stringify({ theme: themeName }),
      });

      if (!response.ok) {
        setUpdateSuccess(false);
        throw new Error('Error al actualizar el tema');
      }

      console.log('Tema actualizado con éxito');
      setUpdateSuccess(true); // Actualización exitosa
    } catch (error) {
      console.error('Error al actualizar el tema:', error);
      setUpdateSuccess(false); // Error en la actualización
    }
  };

  // Manejar la selección de solo un tema a la vez
  const handleSingleCheckboxChange = (themeId: string, checked: boolean, themeName: string, isFree: boolean) => {
    if (checked) {
      setSelectedTheme(themeName); // Actualizar el tema seleccionado
      if (isFree) {
        updateTheme(themeName); // Actualizar solo si es de tipo "free"
      }
    } else {
      setSelectedTheme(null); // Desactivar el tema
      updateTheme(null); // Actualizar la API con "null" si se desactiva
    }
  };

  return {
    themes,
    loading,
    selectedTheme,
    handleSingleCheckboxChange,
    updateSuccess, // Devolver el estado de éxito o fallo
    setUpdateSuccess, // Incluir el setter de updateSuccess
  };
};
