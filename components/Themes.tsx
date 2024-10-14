import React, { useEffect, useState } from 'react';
import { Card, Image, Button, Spacer, CardBody, Spinner } from '@nextui-org/react';
import { NotificationModal, PaymentModal } from '@/components/utils/NotificationModal';
import { useThemes } from '@/hooks/useThemes';
import { useConfig } from '@/hooks/ConfigContext';

const ThemesList: React.FC = () => {
    const { themes, loading, handleSingleCheckboxChange, updateSuccess, setUpdateSuccess } = useThemes();
    const { config, loading: configLoading } = useConfig();
    const [selected, setSelected] = useState<string>('');
    const [pendingSelection, setPendingSelection] = useState<string | null>(null); // Tema pendiente de confirmación
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [payThemeName, setPayThemeName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState('');

    // Sincronizar el tema con la configuración actual al cargar
    useEffect(() => {
        if (config?.theme) {
            setSelected(config.theme.toString());
        }
    }, [config?.theme]);

    // Manejar la respuesta de la API (confirmar si la selección fue exitosa)
    useEffect(() => {
        if (updateSuccess !== null) {
            setIsLoading(false);
            if (updateSuccess) {
                setNotificationMessage('El tema ha sido seleccionado correctamente');
                setSelected(pendingSelection!); // Solo actualizar cuando la API confirma éxito
            } else {
                setNotificationMessage('Error al seleccionar el tema');
            }
            setTimeout(() => {
                setIsNotificationOpen(false);
            }, 2000);
        }
    }, [updateSuccess]);

    const openNotificationModal = (message: string) => {
        setNotificationMessage(message);
        setIsLoading(true);
        setIsNotificationOpen(true);
    };

    const closeNotificationModal = () => {
        setIsNotificationOpen(false);
    };

    const openPaymentModal = (themeName: string) => {
        setPayThemeName(themeName);
        setIsPaymentOpen(true);
    };

    const closePaymentModal = () => {
        setIsPaymentOpen(false);
    };

    const handleThemeSelection = async (themeName: string, themeType: string) => {
        setIsLoading(true);
        setUpdateSuccess(null); // Reiniciar el estado de éxito/fallo
        setPendingSelection(themeName); // Guardar el tema seleccionado como pendiente

        if (themeType === 'pay') {
            openPaymentModal(themeName); // Abrir modal de pago si el tema es de pago
        } else {
            const selectedTheme = themes.find((theme) => theme.name === themeName);
            if (selectedTheme) {
                handleSingleCheckboxChange(selectedTheme._id, true, selectedTheme.name, selectedTheme.type_theme === 'free');
                openNotificationModal('Seleccionando el tema...');
            }
        }
    };

    const renderThemes = () => {
        return themes.map((theme) => {
            const { _id, images, title, type_theme, sale_price, price, name, url_demo } = theme;

            const isSelected = selected === name;
            const cardClassName = isSelected
                ? 'border-2 border-[#0ea5e9]/70 cursor-pointer h-full  bg-[#0c4a6e]/40 w-[100%]'
                : 'cursor-pointer h-full border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40 w-[100%]'; // Aplicar borde si está seleccionado

            return (
                <Card
                    key={_id}
                    shadow="sm"
                    isPressable
                    
                    onClick={() => handleThemeSelection(name, type_theme)}
                    className={cardClassName}
                    
                    isBlurred 
                   
                >
                    <CardBody>
                        <Image
                            src={images[0]}
                            width="100%"
                            height={140}
                            alt={title}
                        />
                        <Spacer y={1} />
                        <div>
                            <strong>{title}</strong>
                        </div>
                        <div>Tipo: {type_theme === 'free' ? 'Gratis' : 'De pago'}</div>
                        {type_theme !== 'free' && (
                            <div>Precio: {price > 0 ? `$${sale_price} (Descuento)` : 'Gratis'}</div>
                        )}
                        <Spacer y={0.5} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <a
                                className='button'
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evitar que el botón interfiera con la selección
                                    window.open(url_demo, '_blank');
                                }}
                            >
                                Ver Demo
                            </a>
                        </div>
                    </CardBody>
                </Card>
            );
        });
    };

    if (loading || configLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <>
            {/* Modal de notificación */}
            <NotificationModal
                isOpen={isNotificationOpen}
                onClose={closeNotificationModal}
                isLoading={isLoading}
                message={notificationMessage}
            />

            {/* Modal de pago */}
            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={closePaymentModal}
                payThemeName={payThemeName}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {renderThemes()}
            </div>
        </>
    );
};

export default ThemesList;
