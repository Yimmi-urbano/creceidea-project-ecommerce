import React, { useState, useEffect } from 'react';
import { Button, Chip, Input, Textarea } from '@nextui-org/react';
import { useConfig } from '@/hooks/ConfigContext';
import { updateSeoMetadata, SeoMetadata } from '@/hooks/serviceUpdateSeo';

const UpdateMetadata: React.FC = () => {
  const { config } = useConfig();
  const [metaDescription, setMetaDescription] = useState(config?.meta_description || '');
  const [metaKeyword, setMetaKeyword] = useState(config?.meta_keyword || '');
  const [title, setTitle] = useState(config?.title || '');
  const [slogan, setSlogan] = useState(config?.slogan || '');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (config) {
      setMetaDescription(config.meta_description || '');
      setMetaKeyword(config.meta_keyword || '');
      setTitle(config.title || '');
      setSlogan(config.slogan || '');
    }
  }, [config]);

  const handleUpdateMetadata = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const updatedData: SeoMetadata = {
      meta_description: metaDescription,
      meta_keyword: metaKeyword,
      title: title,
      slogan: slogan,
    };

    try {
      await updateSeoMetadata(updatedData);
      setSuccessMessage('Datos actualizados!');
    } catch (error) {
      setErrorMessage('Error al actualizar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex gap-3 flex-wrap w-full'>
            <Input
        label="Title"
        placeholder="Enter title"
        value={title}
        classNames={{
          inputWrapper:[
            'border-1 border-[#0ea5e9]/40 bg-sky-900'
          ]
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        label="Slogan"
        placeholder="Enter slogan"
        value={slogan}
        classNames={{
          inputWrapper:[
            'border-1 border-[#0ea5e9]/40 bg-sky-900'
          ]
        }}
        onChange={(e) => setSlogan(e.target.value)}
      />
  
      <Input
        label="Meta Keyword"
        placeholder="Enter meta keyword"
        value={metaKeyword}
        classNames={{
          inputWrapper:[
            'border-1 border-[#0ea5e9]/40 bg-sky-900'
          ]
        }}
        onChange={(e) => setMetaKeyword(e.target.value)}
      />
  
  <Textarea
        label="Meta Description"
        placeholder="Enter meta description"
        value={metaDescription}
        classNames={{
          inputWrapper:[
            'border-1 border-[#0ea5e9]/40 bg-sky-900'
          ]
        }}
        onChange={(e) => setMetaDescription(e.target.value)}
      />

      {errorMessage && <Chip color="warning" variant='flat' className='w-[100%]'>{errorMessage}</Chip>}
      {successMessage && <Chip color="success" variant='flat' className='w-[100%]'>{successMessage}</Chip>}
    
      <Button
        color="success"
        className='mb-4 w-full'
        onClick={handleUpdateMetadata}
        isLoading={loading}
      >
        Actualizar
      </Button>
    </div>
  );
};

export default UpdateMetadata;
