"use client";

import React from 'react';
import { CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { Badge } from '@/src/presentation/components/shared/Badge';

interface Invoice {
    id: string;
    month: string;
    amount: number;
    status: 'pending' | 'paid';
    date: string;
    dueDate: string;
}

const BILLING_DATA: Invoice[] = [
    { id: "INV-2024-001", month: "Noviembre 2024", amount: 150.00, status: "pending", date: "01 Nov 2024", dueDate: "05 Nov 2024" },
    { id: "INV-2023-012", month: "Octubre 2024", amount: 150.00, status: "paid", date: "01 Oct 2024", dueDate: "05 Oct 2024" },
    { id: "INV-2023-011", month: "Septiembre 2024", amount: 150.00, status: "paid", date: "01 Sep 2024", dueDate: "05 Sep 2024" },
];

export default function PageBilling() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1">Mi Suscripción CMS</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Historial de pagos por el uso de la plataforma CreceIdea.
                    </p>
                </div>
            </div>

            {/* Current Plan Card */}
            <div className="rounded-2xl border overflow-hidden relative bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A09D] to-blue-500"></div>
                <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold">Plan Profesional</h2>
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#00A09D] text-white">
                                Activo
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-[#00A09D] mb-4">
                            S/ 150.00 <span className="text-sm font-normal text-zinc-500">/ mes</span>
                        </p>
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2 text-zinc-500">
                                <CheckCircle2 size={16} className="text-[#00A09D]" /> Productos Ilimitados
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500">
                                <CheckCircle2 size={16} className="text-[#00A09D]" /> Soporte 24/7
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500">
                                <CheckCircle2 size={16} className="text-[#00A09D]" /> Backups Diarios
                            </div>
                        </div>
                    </div>

                    {/* Pending Payment Box */}
                    <div className="p-6 rounded-xl w-full md:w-auto md:min-w-[300px] border flex flex-col items-center text-center shadow-2xl bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 shadow-rose-200/50 dark:shadow-rose-900/20">
                        <AlertCircle size={32} className="text-rose-500 mb-3" />
                        <h3 className="font-bold text-rose-500 mb-1">Pago Pendiente</h3>
                        <p className="text-sm text-zinc-500 mb-4">Factura de Noviembre vence en 3 días</p>
                        <button className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-lg shadow-rose-500/30 transition-all active:scale-95">
                            Pagar S/ 150.00
                        </button>
                    </div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="rounded-xl border overflow-hidden bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
                <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-bold">Historial de Facturas</h3>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase font-semibold bg-zinc-50 dark:bg-[#0f1115] text-zinc-500 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4">Periodo</th>
                            <th className="px-6 py-4">Fecha Emisión</th>
                            <th className="px-6 py-4">Vencimiento</th>
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {BILLING_DATA.map((inv) => (
                            <tr key={inv.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-medium block">{inv.month}</span>
                                    <span className="text-xs text-zinc-500">{inv.id}</span>
                                </td>
                                <td className="px-6 py-4 text-zinc-500">{inv.date}</td>
                                <td className="px-6 py-4 text-zinc-500">{inv.dueDate}</td>
                                <td className="px-6 py-4 font-bold">S/ {inv.amount.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <Badge status={inv.status} type="billing" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {inv.status === 'pending' ? (
                                        <button className="text-rose-500 hover:text-rose-600 text-xs font-bold border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-lg transition-colors">
                                            Pagar Ahora
                                        </button>
                                    ) : (
                                        <button className="text-zinc-400 hover:text-[#00A09D] transition-colors">
                                            <Download size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
