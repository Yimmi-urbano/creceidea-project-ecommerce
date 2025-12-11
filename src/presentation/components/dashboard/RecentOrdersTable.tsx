import React from 'react';
import { Badge } from '@/src/presentation/components/shared/Badge';
import { Eye, ExternalLink } from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
}

interface RecentOrdersTableProps {
    orders: Order[];
}

export const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
    return (
        <div className="p-6 rounded-2xl border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                        Últimos Pedidos
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Actividad reciente de tu tienda
                    </p>
                </div>
                <button className="text-sm font-medium text-[#00A09D] hover:text-[#008f8c] flex items-center gap-1 transition-colors">
                    Ver todos
                    <ExternalLink size={14} />
                </button>
            </div>
            <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Pedido
                            </th>
                            <th className="pb-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Cliente
                            </th>
                            <th className="pb-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Producto
                            </th>
                            <th className="pb-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Monto
                            </th>
                            <th className="pb-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Estado
                            </th>
                            <th className="pb-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Fecha
                            </th>
                            <th className="pb-3 pl-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={order.id}
                                className={`group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${index !== orders.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800/50' : ''
                                    }`}
                            >
                                <td className="py-4 pr-4">
                                    <span className="font-mono text-xs font-medium text-[#00A09D]">
                                        #{order.id}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                                        {order.customer}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="text-zinc-600 dark:text-zinc-400">
                                        {order.product}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        S/ {order.amount.toFixed(2)}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <Badge status={order.status} />
                                </td>
                                <td className="py-4 px-4">
                                    <span className="text-zinc-500 dark:text-zinc-400">
                                        {order.date}
                                    </span>
                                </td>
                                <td className="py-4 pl-4 text-right">
                                    <button className="p-2 rounded-lg text-zinc-400 hover:text-[#00A09D] hover:bg-[#00A09D]/10 transition-all opacity-0 group-hover:opacity-100">
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
