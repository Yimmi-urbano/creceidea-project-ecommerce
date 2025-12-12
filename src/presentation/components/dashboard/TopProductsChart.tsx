'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TopProductsChartProps {
    data: Array<{ name: string; sales: number }>;
}

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => {
    return (
        <div className="p-6 rounded-2xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Top 5 Productos
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Más vendidos este mes
                </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                    <XAxis
                        type="number"
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        type="category"
                        dataKey="name"
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                        width={120}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value: any) => [`${value} unidades`, 'Vendidas']}
                    />
                    <Bar
                        dataKey="sales"
                        fill="#00A09D"
                        radius={[0, 8, 8, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
