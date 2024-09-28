import axios from "axios";
import imageCompression from 'browser-image-compression';
import { addProductToWooCommerceService } from '@/hooks/woocommerce/postProduct';
const DEFAULT_ICON_URL = 'https://example.com/icons/placeholder.png';
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
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  };

  try {

    const compressedFile = await imageCompression(file, options);

    const originalName = file.name;
    const version = Date.now();
    const newFileName = `${originalName.split('.')[0]}-${version}.${originalName.split('.').pop()}`;

    const renamedFile = new File([compressedFile], newFileName, {
      type: compressedFile.type,
    });

    const formData = new FormData();
    formData.append('image', renamedFile);

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
  const domain = localStorage.getItem("domainSelect") ?? '';
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

    if (domainPrimary == 'identidadmovil') {
      await addProductToWooCommerceService(data);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
    throw error;
  }
};

export const updateProduct = async (data: any) => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain.split('.')[0];
  const productId = localStorage.getItem("selectedCardId");

  if (!domain) {
    throw new Error("Domain not selected");
  }
  try {
    const response = await fetch(`https://api-products.creceidea.pe/api/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'domain': domainPrimary,
      },
      body: JSON.stringify(data),
    });


    if (!response.ok) {
      throw new Error('Error al enviar los datos del producto');
    }
    /*
        if (domainPrimary == 'identidadmovil') {
          await addProductToWooCommerceService(data);
        }
          */

    return await response.json();
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<any[]> => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain;
  try {
    const response = await fetch('https://api-categories.creceidea.pe/api/categories', {
      headers: { 'domain': domainPrimary, 'method': 'GET' },
    });
    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
};

export const addCategory = async (title: string, selectedParent?: string | null) => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain;

  try {
    const response = await axios.post(
      'https://api-categories.creceidea.pe/api/categories',
      {
        title,
        icon_url: DEFAULT_ICON_URL,
        parent: selectedParent
      },
      {
        headers: {
          domain: domainPrimary,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar la categoría');
  }
};

export const updateCategory = async (id: string, title: string, selectedParent?: string | null) => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain;

  if (id === selectedParent) {
    throw new Error('No puede asignarse a sí mismo como categoría principal');
  }

  try {
    const response = await axios.put(
      `https://api-categories.creceidea.pe/api/categories/${id}`,
      {
        title,
        icon_url: DEFAULT_ICON_URL,
        parent: selectedParent
      },
      {
        headers: {
          domain: domainPrimary,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la categoría');
  }
};

export const deleteCategory = async (id: string) => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain;

  try {
    const response = await axios.delete(
      `https://api-categories.creceidea.pe/api/categories/${id}`,
      {
        headers: {
          domain: domainPrimary,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar la categoría');
  }
};

export const fetchBanners = async () => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain;
  try {
    const response = await axios.get('https://api-configuration.creceidea.pe/api/banners', {
      headers: {
        'Content-Type': 'application/json',
        'domain': domainPrimary,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching banners');
  }
};

export const fetchBannerById = async (bannerId: string) => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain.split('.')[0];
  const response = await fetch(`https://api-configuration.creceidea.pe/api/banners/${bannerId}`, {
    headers: {
      'Content-Type': 'application/json',
      'domain': domainPrimary
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching banner: ${response.statusText}`);
  }

  return response.json();
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const domain = localStorage.getItem("domainSelect");

  if (!domain) {
    throw new Error("Domain not selected");
  }

  const domainPrimary = domain.split('.')[0];

  const url = `https://api-products.creceidea.pe/api/products/${productId}/trash`;

  try {
    await axios.delete(url, {
      headers: {
        Domain: domainPrimary,
      }
    });
    console.log('Producto eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

export const getProductById = async (): Promise<void> => {
  const domain = localStorage.getItem("domainSelect");
  const productId = localStorage.getItem("selectedCardId");

  if (!domain) {
    throw new Error("Domain not selected");
  }

  const domainPrimary = domain.split('.')[0];

  const response = await fetch(`https://api-products.creceidea.pe/api/products/${productId}`, {
    headers: {
      Domain: domainPrimary,
    }
  });
  if (!response.ok) {
    throw new Error('Error fetching product details');
  }
  const data = await response.json();
  return data;
};
