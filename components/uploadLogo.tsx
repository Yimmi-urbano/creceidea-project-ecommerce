import React, { useState } from 'react';
import { Button, Card, CardBody, Spinner, Image } from '@nextui-org/react';
import { CameraIcon, MiniTrashIcon } from '@/components/icons';
import { useUploadLogo } from '@/hooks/logoService';
import { useConfig } from '@/hooks/ConfigContext';

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
    <div>
        <Card className="w-full bg-transparent  md:max-w-[200px] " shadow='none'>
          <CardBody>
        {!showImage && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button
              isIconOnly
              color="success"
              variant="flat"
              className="h-[80px] w-full min-w-10"
              onClick={handleAddImageClick}
            >
              {!loading ? <CameraIcon /> : <Spinner size="lg" color="success" />}
            </Button>
          </>
        )}

        {showImage && logoToDisplay && (
          <div className='w-full'>
            <Image
              isBlurred
              src={logoToDisplay}
              alt="Logo"
              className='bg-white m-auto block'
              width={200}
            />
          
            <Button
              color='warning'
              variant="flat"
              onClick={handleDeleteImage}
              className='mt-3 w-full'
              >
             Reemplazar logo <MiniTrashIcon />
            </Button>
          </div>
        )}
        </CardBody>
        </Card>
     

    </div>
  );
};

export default UploadLogo;
