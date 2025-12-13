'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from '@nextui-org/react';
import { Truck, Package, CheckCircle2, Clock, XCircle, PackageCheck } from 'lucide-react';

interface OrderStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (status: string) => Promise<void>;
    currentStatus?: string;
}

const orderStatusOptions = [
    {
        key: 'pending',
        label: 'Pendiente',
        icon: Clock,
        color: 'text-amber-600',
        description: 'La orden está en espera de procesamiento'
    },
    {
        key: 'processing',
        label: 'En Proceso',
        icon: Package,
        color: 'text-blue-600',
        description: 'La orden está siendo preparada'
    },
    {
        key: 'shipped',
        label: 'Enviado',
        icon: Truck,
        color: 'text-purple-600',
        description: 'La orden ha sido enviada al cliente'
    },
    {
        key: 'delivered',
        label: 'Entregado',
        icon: PackageCheck,
        color: 'text-emerald-600',
        description: 'La orden fue entregada exitosamente'
    },
    {
        key: 'cancelled',
        label: 'Cancelado',
        icon: XCircle,
        color: 'text-rose-600',
        description: 'La orden ha sido cancelada'
    },
];

const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
    isOpen,
    onClose,
    onSave,
    currentStatus = 'pending',
}) => {
    const [orderStatus, setOrderStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await onSave(orderStatus);
            onClose();
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setOrderStatus(currentStatus);
            onClose();
        }
    };

    const selectedOption = orderStatusOptions.find(opt => opt.key === orderStatus);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="lg"
            scrollBehavior="inside"
            classNames={{
                base: "bg-white dark:bg-zinc-900",
                backdrop: "bg-zinc-900/50 backdrop-blur-sm",
                closeButton: "hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                            <Truck size={20} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                Actualizar Estado de Orden
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
                                Modifica el estado de procesamiento y envío de la orden
                            </p>
                        </div>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6 space-y-5">
                    {/* Order Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Package size={16} className="text-zinc-600 dark:text-zinc-400" />
                            Estado de la Orden
                            <span className="text-rose-500">*</span>
                        </label>
                        <Select
                            selectedKeys={[orderStatus]}
                            onSelectionChange={(keys) => setOrderStatus(Array.from(keys)[0] as string)}
                            variant="bordered"
                            classNames={{
                                trigger: "border-zinc-300 dark:border-zinc-700 data-[hover=true]:border-primary",
                            }}
                            renderValue={(items) => {
                                const Icon = selectedOption?.icon || Clock;
                                return (
                                    <div className="flex items-center gap-2">
                                        <Icon size={16} className={selectedOption?.color} />
                                        <span>{selectedOption?.label}</span>
                                    </div>
                                );
                            }}
                        >
                            {orderStatusOptions.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <SelectItem
                                        key={option.key}
                                        value={option.key}
                                        startContent={<Icon size={16} className={option.color} />}
                                        description={option.description}
                                    >
                                        {option.label}
                                    </SelectItem>
                                );
                            })}
                        </Select>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Actualiza el estado según el progreso de la orden
                        </p>
                    </div>

                    {/* Current Status Info */}
                    {selectedOption && (
                        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-start gap-3">
                                {React.createElement(selectedOption.icon, {
                                    size: 20,
                                    className: selectedOption.color
                                })}
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                        {selectedOption.label}
                                    </p>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                        {selectedOption.description}
                                    </p>
                                </div>
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
                        onPress={handleSave}
                        isLoading={loading}
                        className="font-medium shadow-lg shadow-primary/20"
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default OrderStatusModal;
