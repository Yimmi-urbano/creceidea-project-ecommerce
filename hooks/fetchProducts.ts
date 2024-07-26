// fetchProducts.ts
import axios from "axios";

const API_URL_PRODUCTS = process.env.NEXT_PUBLIC_PRODUCTS;

export const getProducts = async (page: number, title: string = "", category: string = "") => {
  const domain = localStorage.getItem("domainSelect");

  if (!domain) {
    throw new Error("Domain not selected");
  }

  const domainPrimary = domain.split('.')[0];

  let url = `${API_URL_PRODUCTS}`;
  if (title) {
    url += `/title/${title}`;
  } else if (category) {
    url += `/category/${category}`;
  }

  const response = await axios.get(url, {
    headers: {
      Domain: domainPrimary,
    },
    params: { page },
  });

  return response.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const domain = localStorage.getItem("domainSelect")??'';
  const domainPrimary = domain.split('.')[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
      const response = await fetch('https://api-upload.creceidea.pe/image/product', {
          method: 'POST',
          headers: {
              'domain': domainPrimary,
          },
          body: formData,
      });

      const result = await response.json();
      if (response.ok) {
          return result.imageUrl;
      } else {
          console.error('Error en la carga de imagen:', result);
          throw new Error('Error en la carga de imagen');
      }
  } catch (error) {
      console.error('Error en la carga de imagen:', error);
      throw error;
  }
};

export const postProduct = async (data: any) => {
  const domain = localStorage.getItem("domainSelect")??'';
  const domainPrimary = domain.split('.')[0];
  try {
      const response = await fetch('https://api-products.creceidea.pe/api/products', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'domain': domainPrimary,
          },
          body: JSON.stringify(data),
      });

      if (!response.ok) {
          throw new Error('Error al enviar los datos del producto');
      }

      return await response.json();
  } catch (error) {
      console.error('Error en la solicitud POST:', error);
      throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  const domain = localStorage.getItem("domainSelect")??'';
  const domainPrimary = domain.split('.')[0];
  try {
      const response = await fetch('https://api-products.creceidea.pe/api/categories', {
          headers: { 'domain': domainPrimary },
      });
      if (!response.ok) {
          throw new Error('Error al obtener las categorías');
      }
      return response.json();
  } catch (error) {
      console.error('Error al obtener categorías:', error);
      return [];
  }
};