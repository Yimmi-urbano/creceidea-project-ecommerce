import { useState, useRef } from 'react';
import { uploadImage } from '@/hooks/fetchProducts';



export const useUploadLogo = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const getDomainFromLocalStorage = (): string => {
      const domain = localStorage.getItem('domainSelect');
      return domain ? domain: '';
    };
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      setLoading(true);
      try {
        const uploadedImageUrl = await uploadImage(file);
        const domain = getDomainFromLocalStorage()
        setImageUrl(uploadedImageUrl);
  
        const response = await fetch('https://api-configuration.creceidea.pe/api/config/logo', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'domain': domain,
          },
          body: JSON.stringify({ logo: uploadedImageUrl }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update logo');
        }
  
        alert('Logo actualizado exitosamente');
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al actualizar el logo');
      } finally {
        setLoading(false);
      }
    };
  
    const handleAddImageClick = () => {
      fileInputRef.current?.click();
    };
  
    return { handleFileChange, handleAddImageClick, loading, imageUrl, fileInputRef };
  };