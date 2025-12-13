'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from '@nextui-org/react';
import { CreditCard, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface PaymentStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (status: string, method: string) => Promise<void>;
    currentStatus?: string;
    currentMethod?: string;
}

const paymentStatusOptions = [
    { key: 'pending', label: 'Pendiente', icon: Clock, color: 'text-amber-600' },
    { key: 'completed', label: 'Completado', icon: CheckCircle2, color: 'text-blue-600' },
    { key: 'decline', label: 'Declinado', icon: XCircle, color: 'text-rose-600' },
];

const paymentMethodOptions = [
    { key: 'credit_card', label: 'Tarjeta de Crédito' },
    { key: 'Yape', label: 'Yape' },
    { key: 'Plin', label: 'Plin' },
    { key: 'transfer', label: 'Transferencia Bancaria' },
    { key: 'cash', label: 'Efectivo' },
];

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
    isOpen,
    onClose,
    onSave,
    currentStatus = 'pending',
    currentMethod = 'credit_card',
}) => {
    const [paymentStatus, setPaymentStatus] = useState(currentStatus);
    const [paymentMethod, setPaymentMethod] = useState(currentMethod);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await onSave(paymentStatus, paymentMethod);
            onClose();
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setPaymentStatus(currentStatus);
            setPaymentMethod(currentMethod);
            onClose();
        }
    };

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
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                            <CreditCard size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                Actualizar Estado de Pago
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
                                Modifica el estado del pago y el método utilizado
                            </p>
                        </div>
                    </div>
                </ModalHeader>

                <ModalBody className="py-6 space-y-5">
                    {/* Payment Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-zinc-600 dark:text-zinc-400" />
                            Estado del Pago
                            <span className="text-rose-500">*</span>
                        </label>
                        <Select
                            selectedKeys={[paymentStatus]}
                            onSelectionChange={(keys) => setPaymentStatus(Array.from(keys)[0] as string)}
                            variant="bordered"
                            classNames={{
                                trigger: "border-zinc-300 dark:border-zinc-700 data-[hover=true]:border-primary",
                            }}
                            renderValue={(items) => {
                                const selected = paymentStatusOptions.find(opt => opt.key === paymentStatus);
                                const Icon = selected?.icon || Clock;
                                return (
                                    <div className="flex items-center gap-2">
                                        <Icon size={16} className={selected?.color} />
                                        <span>{selected?.label}</span>
                                    </div>
                                );
                            }}
                        >
                            {paymentStatusOptions.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <SelectItem
                                        key={option.key}
                                        value={option.key}
                                        startContent={<Icon size={16} className={option.color} />}
                                    >
                                        {option.label}
                                    </SelectItem>
                                );
                            })}
                        </Select>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Selecciona el estado actual del pago de esta orden
                        </p>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <CreditCard size={16} className="text-zinc-600 dark:text-zinc-400" />
                            Método de Pago
                            <span className="text-rose-500">*</span>
                        </label>
                        <Select
                            selectedKeys={[paymentMethod]}
                            onSelectionChange={(keys) => setPaymentMethod(Array.from(keys)[0] as string)}
                            variant="bordered"
                            classNames={{
                                trigger: "border-zinc-300 dark:border-zinc-700 data-[hover=true]:border-primary",
                            }}
                        >
                            {paymentMethodOptions.map((option) => (
                                <SelectItem key={option.key} value={option.key}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Indica el método de pago utilizado por el cliente
                        </p>
                    </div>
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

export default PaymentStatusModal;
