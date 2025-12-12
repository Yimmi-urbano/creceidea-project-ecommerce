import React, { useState } from 'react';
import { Button, Card, CardBody, Spinner, Image } from '@nextui-org/react';
import { Camera, Trash2 } from 'lucide-react';
import { useUploadLogo } from '@/src/presentation/hooks/configuration/useUploadLogo';
import { useConfig } from '@/src/presentation/contexts';

const UploadLogo: React.FC = () => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const { handleFileChange, handleAddImageClick, loading, imageUrl, fileInputRef } = useUploadLogo();
  const { config } = useConfig();

  const logoToDisplay = imageUrl || config?.logo;

  const handleDeleteImage = () => {
    setShowImage(false);
  };

  React.useEffect(() => {
    if (logoToDisplay) {
      setShowImage(true);
    }
  }, [logoToDisplay]);

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />

      <Card className="w-full border-none shadow-none bg-transparent" radius="none">
        <CardBody className="p-0">
          {!logoToDisplay ? (
            <div
              className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              onClick={handleAddImageClick}
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[#00A09D]">
                {!loading ? <Camera size={24} /> : <Spinner size="sm" color="current" />}
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Subir Logo</span>
            </div>
          ) : (
            <div className='w-full col-span-12 flex flex-col gap-3'>
              <div className="relative group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2">
                <Image
                  src={logoToDisplay}
                  alt="Logo del Sitio"
                  className='w-full h-auto object-contain max-h-[150px] mx-auto'
                  radius='lg'
                  removeWrapper
                />
              </div>

              <div className="flex gap-2">
                <Button
                  color='primary'
                  className="flex-1 font-medium"
                  onClick={handleAddImageClick}
                  startContent={<Camera size={16} />}
                >
                  Cambiar
                </Button>
                <Button
                  color='danger'
                  variant="flat"
                  isIconOnly
                  onClick={handleDeleteImage}
                  className="w-auto px-4"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UploadLogo;
