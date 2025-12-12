import React, { useEffect, useState } from 'react';
import { Card, Image, Button, Spacer, CardBody, Spinner } from '@nextui-org/react';
import { NotificationModal, PaymentModal } from '@/src/presentation/components/client/utils/NotificationModal';
import { useThemes } from '@/src/presentation/hooks/configuration/useThemes';
import { useConfig } from '@/src/presentation/contexts';

const ThemesList: React.FC = () => {
    const { themes, loading, handleSingleCheckboxChange, updateSuccess, setUpdateSuccess } = useThemes();
    const { config, loading: configLoading } = useConfig();
    const [selected, setSelected] = useState<string>('');
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [payThemeName, setPayThemeName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        if (config?.theme) {
            setSelected(config.theme.toString());
        }
    }, [config?.theme]);

    useEffect(() => {
        if (updateSuccess !== null) {
            setIsLoading(false);
            if (updateSuccess) {
                setNotificationMessage('El tema ha sido seleccionado correctamente');
                setSelected(pendingSelection!);
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

    const openPaymentModal = (themeTitle: string) => {
        setPayThemeName(themeTitle);
        setIsPaymentOpen(true);
    };

    const closePaymentModal = () => {
        setIsPaymentOpen(false);
    };

    const handleThemeSelection = async (themeName: string, themeType: string, themeTitle: string) => {
        if (selected === themeName) return; // Ya esta seleccionado

        setIsLoading(true);
        setUpdateSuccess(null);
        setPendingSelection(themeName);

        if (themeType === 'pay') {
            openPaymentModal(themeTitle);
        } else {
            const selectedTheme = themes.find((theme) => theme.name === themeName);
            if (selectedTheme) {
                handleSingleCheckboxChange(selectedTheme._id, true, selectedTheme.name, selectedTheme.type_theme === 'free');
                openNotificationModal('Seleccionando el tema...');
            }
        }
    };

    if (loading || configLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    return (
        <>
            <NotificationModal
                isOpen={isNotificationOpen}
                onClose={closeNotificationModal}
                isLoading={isLoading}
                message={notificationMessage}
            />

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={closePaymentModal}
                payThemeName={payThemeName}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-1">
                {themes.map((theme) => {
                    const { _id, images, title, type_theme, sale_price, price, name, url_demo } = theme;
                    const isSelected = selected === name;

                    return (
                        <Card
                            key={_id}
                            shadow="none"
                            className={`
                                relative border group transition-all duration-300
                                ${isSelected
                                    ? 'border-[#00A09D] ring-1 ring-[#00A09D] bg-white dark:bg-zinc-900'
                                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-[#00A09D]/50'
                                }
                            `}
                        >
                            {/* Imagen Header */}
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    classNames={{
                                        wrapper: "w-full h-full",
                                        img: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    }}
                                    radius="none"
                                />
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-[#00A09D] text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                                        Activo
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 flex gap-1">
                                    {type_theme === 'free' ? (
                                        <div className="bg-zinc-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                                            GRATIS
                                        </div>
                                    ) : (
                                        <div className="bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                                            PREMIUM
                                        </div>
                                    )}
                                </div>
                            </div>

                            <CardBody className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg line-clamp-1">{title}</h3>
                                        {type_theme !== 'free' && (
                                            <p className="text-sm text-zinc-500">
                                                {price > 0 ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="font-bold text-[#00A09D]">${sale_price}</span>
                                                        <span className="line-through text-xs">${price}</span>
                                                    </span>
                                                ) : 'Gratis'}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mt-2">
                                    {!isSelected && (
                                        <Button
                                            className="w-full font-medium"
                                            color="primary"
                                            size="sm"
                                            onClick={() => handleThemeSelection(name, type_theme, title)}
                                        >
                                            Seleccionar Diseño
                                        </Button>
                                    )}

                                    <div className="flex gap-2">
                                        <Button
                                            className="flex-1 border-zinc-200 dark:border-zinc-700 font-medium"
                                            variant="bordered"
                                            size="sm"
                                            onClick={() => window.open(url_demo, '_blank')}
                                        >
                                            Ver Demo
                                        </Button>
                                        {type_theme !== 'free' && (
                                            <Button
                                                className="flex-1 font-medium"
                                                color="danger"
                                                variant="flat"
                                                size="sm"
                                                onClick={() => openPaymentModal(title)}
                                            >
                                                Quitar Anuncio
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default ThemesList;
