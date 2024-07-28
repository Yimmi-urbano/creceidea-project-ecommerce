// fetchProducts.ts
import axios from "axios";
import imageCompression from 'browser-image-compression';


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
  const domain = localStorage.getItem('domainSelect') ?? '';
  const domainPrimary = domain.split('.')[0];

  const options = {
    maxSizeMB: 1,          // Tamaño máximo del archivo en MB
    maxWidthOrHeight: 800, // Ancho o alto máximo de la imagen
    useWebWorker: true,    // Usar web workers para mejorar el rendimiento
  };

  try {
    // Comprimir la imagen
    const compressedFile = await imageCompression(file, options);

    // Generar un nuevo nombre para el archivo con una versión
    const originalName = file.name;
    const version = Date.now(); // Puedes usar una versión, timestamp u otro identificador
    const newFileName = `${originalName.split('.')[0]}-${version}.${originalName.split('.').pop()}`;

    // Crear un nuevo archivo con el nombre modificado
    const renamedFile = new File([compressedFile], newFileName, {
      type: compressedFile.type,
    });

    // Crear FormData y añadir la imagen comprimida y renombrada
    const formData = new FormData();
    formData.append('image', renamedFile);

    // Enviar la imagen comprimida al servidor
    const response = await fetch('https://api-upload.creceidea.pe/image/product', {
      method: 'POST',
      headers: {
        domain: domainPrimary,
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

export const fetchCategories = async (): Promise<any[]> => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain.split('.')[0];


  try {
      const response = await fetch('https://api-categories.creceidea.pe/api/categories', {
          headers: { 'domain': domainPrimary, 'method':'GET' },
      });
      if (!response.ok) {
          throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      console.log(data)
      return data;
  } catch (error) {
      console.error('Error al obtener categorías:', error);
      return [];
  }
};
