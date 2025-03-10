'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Spinner, Checkbox } from '@nextui-org/react';
import { CameraIcon, MiniTrashIcon } from '../icons';
import { submitBanner, updateBanner, Banner } from '@/hooks/bannerService';
import { uploadImage } from '@/hooks/fetchProducts';

interface BannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    banner?: Banner;
}

const BannerModal: React.FC<BannerModalProps> = ({ isOpen, onClose, banner }) => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [action, setAction] = useState('href');
    const [destino, setDestino] = useState('');
    const [textButton, setTextButton] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Estados de activación de los checkboxes
    const [isActiveTextBanner, setActiveTextBanner] = useState(false);
    const [isActiveLinkBanner, setActiveLinkBanner] = useState(false);
    const [isActiveButtonBanner, setActiveButtonBanner] = useState(false);

    // Al abrir el modal, establecer los valores y activar los checkboxes si hay datos
    useEffect(() => {
        if (banner) {
            setImageUrl(banner.image);
            setText(banner.text || '');
            setDestino(banner.button?.[0]?.destino || '');
            setTextButton(banner.button?.[0]?.text_button || '');

            // Activar checkboxes solo si los valores existen
            setActiveTextBanner(!!banner.text);
            setActiveLinkBanner(!!banner.button?.[0]?.destino);
            setActiveButtonBanner(!!banner.button?.[0]?.text_button);
        } else {
            // Restablecer valores si es un nuevo banner
            setImageUrl(null);
            setText('');
            setDestino('');
            setTextButton('');
            setActiveTextBanner(false);
            setActiveLinkBanner(false);
            setActiveButtonBanner(false);
        }
    }, [banner]);

    // Limpiar los campos cuando se desactiva el checkbox
    useEffect(() => {
        if (!isActiveTextBanner) setText('');
        if (!isActiveLinkBanner) setDestino('');
        if (!isActiveButtonBanner) setTextButton('');
    }, [isActiveTextBanner, isActiveLinkBanner, isActiveButtonBanner]);

    const handleAddImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setLoading(true);

            try {
                const uploadedImageUrl = await uploadImage(e.target.files[0]);
                setImageUrl(uploadedImageUrl);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveImage = () => {
        setImageUrl(null);
        setFile(null);
    };

    const handleSubmit = async () => {
       // if (!text || !action || !destino || !textButton) return;

        setLoading(true);

        try {
            if (banner?._id) {
                await updateBanner(banner._id, file, imageUrl || banner.image, text, action, destino, textButton);
            } else {
                await submitBanner(file as File, text, action, destino, textButton);
            }
            onClose();
        } catch (error) {
            console.error('Error al enviar el banner:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className='backdrop-blur-md border-1 border-[#0ea5e9]/20 bg-[#082f49]/90'>
            <ModalContent>
                <ModalHeader>
                    <h2>{banner ? 'Editar Banner' : 'Crear Banner'}</h2>
                </ModalHeader>
                <ModalBody>
                    {!imageUrl && (
                        <>
                            <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            <Button isIconOnly color='warning' variant='flat' className='h-[80px] w-full min-w-20' onClick={handleAddImageClick}>
                                {!loading ? <CameraIcon /> : <Spinner size="lg" color="warning" />}
                            </Button>
                        </>
                    )}

                    {imageUrl && (
                        <>
                            <img src={imageUrl} alt="Banner Preview" className="w-full h-[200px] rounded-xl object-cover mb-4" />
                            <Button color='danger' onClick={handleRemoveImage}>
                                Eliminar Imagen <MiniTrashIcon />
                            </Button>

                            {/* Checkbox e Input para el texto del banner */}
                            <label className='flex items-center gap-2'>
                                <Checkbox isSelected={isActiveTextBanner} onChange={() => setActiveTextBanner(!isActiveTextBanner)} />
                                <Input
                                    fullWidth
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Texto del banner"
                                    isDisabled={!isActiveTextBanner}
                                />
                            </label>

                            {/* Checkbox e Input para el destino del botón */}
                            <label className='flex items-center gap-2'>
                                <Checkbox isSelected={isActiveLinkBanner} onChange={() => setActiveLinkBanner(!isActiveLinkBanner)} />
                                <Input
                                    fullWidth
                                    value={destino}
                                    onChange={(e) => setDestino(e.target.value)}
                                    placeholder="Destino del botón (e.g., /catalog)"
                                    isDisabled={!isActiveLinkBanner}
                                />
                            </label>

                            {/* Checkbox e Input para el texto del botón */}
                            <label className='flex items-center gap-2'>
                                <Checkbox isSelected={isActiveButtonBanner} onChange={() => setActiveButtonBanner(!isActiveButtonBanner)} />
                                <Input
                                    fullWidth
                                    value={textButton}
                                    onChange={(e) => setTextButton(e.target.value)}
                                    placeholder="Texto del botón (e.g., Ver Ofertas)"
                                    isDisabled={!isActiveButtonBanner}
                                />
                            </label>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='flat' onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    {imageUrl && (
                        <Button color='warning' onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Subiendo...' : (banner ? 'Actualizar Banner' : 'Crear Banner')}
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BannerModal;
