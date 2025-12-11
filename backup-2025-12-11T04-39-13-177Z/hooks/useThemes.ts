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
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

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
      setUpdateSuccess(true); 
    } catch (error) {
      console.error('Error al actualizar el tema:', error);
      setUpdateSuccess(false); 
    }
  };

  const handleSingleCheckboxChange = (themeId: string, checked: boolean, themeName: string, isFree: boolean) => {
    if (checked) {
      setSelectedTheme(themeName); 
      if (isFree) {
        updateTheme(themeName);
      }
    } else {
      setSelectedTheme(null);
      updateTheme(null);
    }
  };

  return {
    themes,
    loading,
    selectedTheme,
    handleSingleCheckboxChange,
    updateSuccess, 
    setUpdateSuccess, 
  };
};
