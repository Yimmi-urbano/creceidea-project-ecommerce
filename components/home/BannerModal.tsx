'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Spinner } from '@nextui-org/react';
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
    const [destino, setDestino] = useState('/catalog');
    const [textButton, setTextButton] = useState('Ver Ofertas');
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (banner) {
            setImageUrl(banner.image);
            setText(banner.text);
            setAction(banner.button[0]?.action || 'href');
            setDestino(banner.button[0]?.destino || '/catalog');
            setTextButton(banner.button[0]?.text_button || 'Ver Ofertas');
        } else {
            setImageUrl(null);
            setText('');
            setAction('href');
            setDestino('/catalog');
            setTextButton('Ver Ofertas');
        }
    }, [banner]);

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
        if (!text || !action || !destino || !textButton) return;

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
        <Modal isOpen={isOpen} onClose={onClose} className='bg-background/70 dark:bg-sky-950/30'>
            <ModalContent>
                <ModalHeader>
                    <h2>{banner ? 'Editar Banner' : 'Crear Banner'}</h2>
                </ModalHeader>
                <ModalBody>
                    {!imageUrl && (
                        <>
                            <input
                                ref={fileInputRef}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <Button
                                
                                isIconOnly

                                color='success'
                                variant='flat'
                                className='h-[80px] w-full min-w-20'
                                onClick={handleAddImageClick}
                            >
                                {!loading ? <CameraIcon /> : <Spinner size="lg" color="success" />}
                            </Button>
                        </>
                    )}

                    {imageUrl && (
                        <>
                            <img src={imageUrl} alt="Banner Preview" className="w-full h-[200px] rounded-xl object-cover mb-4"/>
                            <Button
                                color='danger'
                                variant='flat'
                                onClick={handleRemoveImage}
                            >
                                Eliminar Imagen  <MiniTrashIcon />
                            </Button>
                            <Input
                                fullWidth
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Texto del banner"
                            />
                          
                            <Input
                                fullWidth
                                value={destino}
                                onChange={(e) => setDestino(e.target.value)}
                                placeholder="Destino del botón (e.g., /catalog)"
                            />
                            <Input
                                fullWidth
                                value={textButton}
                                onChange={(e) => setTextButton(e.target.value)}
                                placeholder="Texto del botón (e.g., Ver Ofertas)"
                            />
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='flat' onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    {imageUrl && (
                        <Button color='success' variant='flat' onClick={handleSubmit} disabled={loading || !text || !action || !destino || !textButton}>
                            {loading ? 'Subiendo...' : (banner ? 'Actualizar Banner' : 'Crear Banner')}
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BannerModal;
