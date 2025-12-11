import axios from "axios";
import imageCompression from 'browser-image-compression';

export const uploadImage = async (file: File): Promise<any> => {
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