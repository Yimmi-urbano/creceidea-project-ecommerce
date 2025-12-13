"use client";

import React, { useState } from "react";
import useOrderDetails from "@/src/presentation/hooks/orders/useOrderDetails";
import { ArrowLeft, Package, CreditCard, Truck, User, Mail, Phone, MapPin, Calendar, Hash, DollarSign, Edit3, Download, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { OrderDetailSkeleton } from "@/src/presentation/components/shared/SkeletonLoaders";

const OrderDetails: React.FC<{ orderId: string }> = ({ orderId }) => {
    const { orderData, loading, error } = useOrderDetails(orderId);
    const [activeTab, setActiveTab] = useState<'details' | 'timeline'>('details');

    if (loading) {
        return <OrderDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/20 mb-4">
                    <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Error al cargar el pedido</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{error}</p>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className="p-6 text-center">
                <p className="text-zinc-500 dark:text-zinc-400">No se encontró el pedido</p>
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5" />;
            case 'pending':
                return <Clock className="w-5 h-5" />;
            case 'decline':
            case 'cancelled':
                return <XCircle className="w-5 h-5" />;
            default:
                return <Clock className="w-5 h-5" />;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
            case 'pending':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
            case 'decline':
            case 'cancelled':
                return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
            default:
                return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Completado';
            case 'pending':
                return 'Pendiente';
            case 'decline':
                return 'Rechazado';
            case 'cancelled':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const clientName = orderData.clientInfo?.first_name || orderData.clientInfo?.name || '';
    const clientLastName = orderData.clientInfo?.last_name || '';
    const fullName = `${clientName} ${clientLastName}`.trim();

    const subtotal = orderData.products.reduce((sum, product) => sum + (product.valid_price * product.qty), 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/orders"
                        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-zinc-600 dark:text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            Pedido #{orderData.orderNumber.substring(0, 13)}
                        </h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                            Creado el {orderData.createdAt}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium">
                        <Download size={16} />
                        Descargar PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors text-sm font-medium">
                        <Edit3 size={16} />
                        Editar
                    </button>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                            <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">Estado de Pago</h3>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusClass(orderData.paymentStatus?.typeStatus || 'pending')}`}>
                        {getStatusIcon(orderData.paymentStatus?.typeStatus || 'pending')}
                        {getStatusLabel(orderData.paymentStatus?.typeStatus || 'pending')}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
                        {orderData.paymentStatus?.message || 'Sin mensaje'}
                    </p>
                    {orderData.paymentStatus?.date && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Fecha: {orderData.paymentStatus.date}
                        </p>
                    )}
                </div>

                <div className="p-6 rounded-xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                            <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">Estado de Envío</h3>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusClass(orderData.orderStatus?.typeStatus || 'pending')}`}>
                        {getStatusIcon(orderData.orderStatus?.typeStatus || 'pending')}
                        {getStatusLabel(orderData.orderStatus?.typeStatus || 'pending')}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
                        {orderData.orderStatus?.message || 'Sin mensaje'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Products */}
                    <div className="rounded-xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Package className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                    Productos ({orderData.products.length})
                                </h2>
                            </div>
                        </div>
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {orderData.products.map((product) => (
                                <div key={product.id} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-20 h-20 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                                                {product.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                                                <span>Cantidad: {product.qty}</span>
                                                <span>Precio: {orderData.currency === "PEN" ? "S/" : "$"} {product.valid_price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-zinc-900 dark:text-white">
                                                {orderData.currency === "PEN" ? "S/" : "$"} {(product.valid_price * product.qty).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="p-6 bg-zinc-50 dark:bg-dark-bg border-t border-zinc-200 dark:border-zinc-800">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
                                    <span className="font-medium text-zinc-900 dark:text-white">
                                        {orderData.currency === "PEN" ? "S/" : "$"} {subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-600 dark:text-zinc-400">Envío</span>
                                    <span className="font-medium text-zinc-900 dark:text-white">Gratis</span>
                                </div>
                                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                                    <div className="flex justify-between">
                                        <span className="text-base font-semibold text-zinc-900 dark:text-white">Total</span>
                                        <span className="text-xl font-bold text-primary">
                                            {orderData.currency === "PEN" ? "S/" : "$"} {orderData.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="rounded-xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Cliente</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Nombre</p>
                                <p className="font-medium text-zinc-900 dark:text-white">{fullName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-zinc-400" />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{orderData.clientInfo.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-zinc-400" />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{orderData.clientInfo.phone}</p>
                            </div>
                            {orderData.clientInfo.number_doc && (
                                <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-zinc-400" />
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">DNI: {orderData.clientInfo.number_doc}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="rounded-xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                                <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Método de Pago</h2>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                            {orderData.paymentStatus?.methodPayment?.replace(/_/g, ' ') || 'No especificado'}
                        </p>
                    </div>

                    {/* Shipping Address */}
                    {orderData.shippingInfo?.street_address && (
                        <div className="rounded-xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Dirección de Envío</h2>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {orderData.shippingInfo.street_address}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
