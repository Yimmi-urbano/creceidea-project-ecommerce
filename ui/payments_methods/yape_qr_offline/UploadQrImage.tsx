import React, { useState, useRef, useEffect } from "react";
import { Button, Card, CardBody, Spinner, Image } from "@nextui-org/react";
import { CameraIcon, MiniTrashIcon } from "@/components/icons";
import { postUploadImage } from "@/src/application/upload/uploadServices";

interface UploadQrImageProps {
  onImageUpload: (url: string) => void;
  initialImage?: string;
}

const UploadQrImage: React.FC<UploadQrImageProps> = ({ onImageUpload, initialImage }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImage || null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage);
    }
  }, [initialImage]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
  
    const file = event.target.files[0];
    setLoading(true);
  
    try {
      const uploadedImageUrl = await postUploadImage(file);
  
      if (uploadedImageUrl && typeof uploadedImageUrl === "string") {
        setImageUrl(uploadedImageUrl);
        onImageUpload(uploadedImageUrl);
      } else {
        console.error("Error: La respuesta de la API no es una URL válida", uploadedImageUrl);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un problema al subir la imagen.");
    }
  
    setLoading(false);
  };
  

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setImageUrl(null);
    onImageUpload("");
  };

  return (
    <Card className="bg-transparent mx-auto h-full" shadow="none">
      <CardBody>
        {!imageUrl ? (
          <>
            <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
            <Button
              isIconOnly
              color="success"
              variant="flat"
              className="h-full w-full min-w-[200px]"
              onClick={handleAddImageClick}
            >
              {!loading ? <CameraIcon /> : <Spinner size="lg" color="success" />}
            </Button>
          </>
        ) : (
          <div className="w-full block">
            <Image isBlurred src={imageUrl} alt="Código QR"   className='object-contain border-1 border-[#0ea5e9]/30 h-[80px] min-w-20 md:h-[200px] md:w-[200px] w-full' />
            <Button color="warning" variant="flat" onClick={handleDeleteImage} className="mt-3 w-full">
              Reemplazar QR <MiniTrashIcon />
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default UploadQrImage;
