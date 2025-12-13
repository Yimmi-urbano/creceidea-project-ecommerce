'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Spinner } from '@nextui-org/react';
import { Upload, X, Image as ImageIcon, Type, Link as LinkIcon, MousePointer } from 'lucide-react';
import { Banner } from '@/src/domain/banners/Banner';
import { createBanner, updateBanner as updateBannerService } from '@/src/application/banners/bannerServices';
import { uploadImage } from '@/src/infrastructure/repositories/uploadRepository';

interface BannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    banner?: Banner;
}

const BannerModal: React.FC<BannerModalProps> = ({ isOpen, onClose, banner }) => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [destino, setDestino] = useState('');
    const [textButton, setTextButton] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load banner data when editing
    useEffect(() => {
        if (banner) {
            setImageUrl(banner.image);
            setText(banner.text || '');
            setDestino(banner.button?.[0]?.destino || '');
            setTextButton(banner.button?.[0]?.text_button || '');
        } else {
            // Reset for new banner
            setImageUrl(null);
            setFile(null);
            setText('');
            setDestino('');
            setTextButton('');
        }
    }, [banner, isOpen]);

    const handleAddImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido');
                return;
            }

            // Validate file size (max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert('La imagen no debe superar los 5MB');
                return;
            }

            setFile(selectedFile);
            setUploadingImage(true);

            try {
                const uploadedImageUrl = await uploadImage(selectedFile);
                setImageUrl(uploadedImageUrl);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                alert('Error al subir la imagen. Por favor intenta de nuevo.');
                setFile(null);
            } finally {
                setUploadingImage(false);
            }
        }
    };

    const handleRemoveImage = () => {
        setImageUrl(null);
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async () => {
        if (!imageUrl) {
            alert('Por favor sube una imagen para el banner');
            return;
        }

        setLoading(true);

        try {
            if (banner?._id) {
                await updateBannerService(
                    banner._id,
                    file,
                    imageUrl,
                    text,
                    'href',
                    destino,
                    textButton
                );
            } else {
                if (!file) {
                    alert('Por favor sube una imagen');
                    return;
                }
                await createBanner(file, text, 'href', destino, textButton);
            }

            // Reset form
            handleRemoveImage();
            setText('');
            setDestino('');
            setTextButton('');

            onClose();
            // Parent component should handle refresh
        } catch (error) {
            console.error('Error al guardar el banner:', error);
            alert('Error al guardar el banner. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            handleRemoveImage();
            setText('');
            setDestino('');
            setTextButton('');
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
            scrollBehavior="inside"
            classNames={{
                base: "bg-white dark:bg-zinc-900",
                backdrop: "bg-zinc-900/50 backdrop-blur-sm",
                closeButton: "hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 transition-colors"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {banner ? 'Editar Banner' : 'Crear Nuevo Banner'}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
                        {banner
                            ? 'Actualiza la información de tu banner promocional'
                            : 'Agrega un nuevo banner para destacar en tu página principal'
                        }
                    </p>
                </ModalHeader>

                <ModalBody className="py-6 space-y-6">
                    {/* Image Upload Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ImageIcon size={18} className="text-zinc-600 dark:text-zinc-400" />
                            <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                Imagen del Banner <span className="text-rose-500">*</span>
                            </label>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-1">
                            Tamaño recomendado: 1920x600px. Máximo 5MB. Formatos: JPG, PNG, WebP
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        {!imageUrl ? (
                            <button
                                onClick={handleAddImageClick}
                                disabled={uploadingImage}
                                className="w-full h-48 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 hover:border-primary hover:bg-primary/5 transition-all duration-200 flex flex-col items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploadingImage ? (
                                    <>
                                        <Spinner size="lg" color="primary" />
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Subiendo imagen...
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-primary/10 transition-colors">
                                            <Upload size={32} className="text-zinc-400 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                                                Click para subir imagen
                                            </p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                o arrastra y suelta aquí
                                            </p>
                                        </div>
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="relative group">
                                <img
                                    src={imageUrl}
                                    alt="Banner Preview"
                                    className="w-full h-48 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800"
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-3 right-3 p-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    title="Eliminar imagen"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Optional Fields - Only show when image is uploaded */}
                    {imageUrl && (
                        <div className="space-y-5 pt-2">
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

                            {/* Banner Text */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Type size={16} className="text-zinc-600 dark:text-zinc-400" />
                                    <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        Texto del Banner
                                    </label>
                                    <span className="text-xs text-zinc-400">(Opcional)</span>
                                </div>
                                <Input
                                    variant="bordered"
                                    placeholder="Ej: ¡Ofertas de temporada hasta 50% OFF!"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    classNames={{
                                        inputWrapper: "border-zinc-300 dark:border-zinc-700 group-data-[focus=true]:border-primary"
                                    }}
                                />
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Texto que se mostrará sobre el banner
                                </p>
                            </div>

                            {/* Button Text */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <MousePointer size={16} className="text-zinc-600 dark:text-zinc-400" />
                                    <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        Texto del Botón
                                    </label>
                                    <span className="text-xs text-zinc-400">(Opcional)</span>
                                </div>
                                <Input
                                    variant="bordered"
                                    placeholder="Ej: Ver Ofertas, Comprar Ahora, Explorar"
                                    value={textButton}
                                    onChange={(e) => setTextButton(e.target.value)}
                                    classNames={{
                                        inputWrapper: "border-zinc-300 dark:border-zinc-700 group-data-[focus=true]:border-primary"
                                    }}
                                />
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Texto que aparecerá en el botón de acción
                                </p>
                            </div>

                            {/* Destination Link */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <LinkIcon size={16} className="text-zinc-600 dark:text-zinc-400" />
                                    <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        Enlace de Destino
                                    </label>
                                    <span className="text-xs text-zinc-400">(Opcional)</span>
                                </div>
                                <Input
                                    variant="bordered"
                                    placeholder="Ej: /catalog, /products/ofertas, https://..."
                                    value={destino}
                                    onChange={(e) => setDestino(e.target.value)}
                                    classNames={{
                                        inputWrapper: "border-zinc-300 dark:border-zinc-700 group-data-[focus=true]:border-primary"
                                    }}
                                />
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Página a la que redirigirá el banner al hacer click
                                </p>
                            </div>
                        </div>
                    )}
                </ModalBody>

                <ModalFooter className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                    <Button
                        variant="flat"
                        onPress={handleClose}
                        disabled={loading}
                        className="font-medium"
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleSubmit}
                        isLoading={loading}
                        isDisabled={!imageUrl || loading}
                        className="font-medium shadow-lg shadow-primary/20"
                    >
                        {loading ? 'Guardando...' : (banner ? 'Actualizar Banner' : 'Crear Banner')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BannerModal;
