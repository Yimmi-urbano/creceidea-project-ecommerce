"use client";

import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

export default function PaymentMethodsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1">Métodos de Pago</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Administra los métodos de pago disponibles en tu tienda
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[#00A09D] hover:bg-[#008f8c] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-[#00A09D]/25 transition-all hover:scale-105 active:scale-95">
                    <Plus size={18} />
                    <span>Agregar Método</span>
                </button>
            </div>

            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder cards */}
                <div className="p-6 rounded-2xl border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 hover:border-[#00A09D]/30 dark:hover:border-[#00A09D]/30 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-[#00A09D]/10 text-[#00A09D]">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Tarjeta de Crédito</h3>
                            <p className="text-xs text-zinc-500">Visa, Mastercard, Amex</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">Estado:</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Activo
                        </span>
                    </div>
                </div>

                {/* Empty state */}
                <div className="col-span-full p-12 text-center border-2 border-dashed rounded-2xl border-zinc-200 dark:border-zinc-800">
                    <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CreditCard size={32} className="text-zinc-400" />
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-2">No hay métodos de pago configurados</p>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">
                        Agrega métodos de pago para que tus clientes puedan realizar compras
                    </p>
                </div>
            </div>
        </div>
    );
}
