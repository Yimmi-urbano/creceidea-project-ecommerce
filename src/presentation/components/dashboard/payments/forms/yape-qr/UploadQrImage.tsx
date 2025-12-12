import React, { useState, useRef, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { toast } from "sonner";
import { Camera, Trash2, UploadCloud, Image as ImageIcon } from "lucide-react";
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
      // ... imports ...

      // ... inside component ...
      toast.error("Hubo un problema al subir la imagen.");
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
    <div className="w-full h-full min-h-[250px] flex flex-col">
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />

      {!imageUrl ? (
        <div
          onClick={handleAddImageClick}
          className="flex-1 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 p-6 group"
        >
          <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-[#00A09D]/10 transition-colors">
            {loading ? (
              <Spinner size="lg" color="success" />
            ) : (
              <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-[#00A09D] transition-colors" />
            )}
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {loading ? "Subiendo imagen..." : "Sube tu código QR"}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Haz clic para seleccionar una imagen
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800/20 relative group overflow-hidden">
          <img
            src={imageUrl}
            alt="Código QR"
            className="w-full h-full object-contain max-h-[200px] mb-4 rounded-lg"
          />
          <div className="w-full mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={handleDeleteImage}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-colors text-sm font-medium"
            >
              <Trash2 size={16} />
              Eliminar QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadQrImage;
