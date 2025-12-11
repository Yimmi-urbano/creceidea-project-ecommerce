'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface SalesChartProps {
    data: Array<{ date: string; sales: number; orders: number }>;
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
    return (
        <div className="p-6 rounded-2xl border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Ventas de los Últimos 30 Días
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Tendencia de ventas e ingresos
                </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00A09D" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#00A09D" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                    <XAxis
                        dataKey="date"
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `S/ ${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value: any) => [`S/ ${value}`, 'Ventas']}
                    />
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#00A09D"
                        strokeWidth={2}
                        fill="url(#colorSales)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
