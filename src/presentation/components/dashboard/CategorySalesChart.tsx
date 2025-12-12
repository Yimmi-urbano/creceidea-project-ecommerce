'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CategorySalesChartProps {
    data: Array<{ category: string; sales: number }>;
}

export const CategorySalesChart: React.FC<CategorySalesChartProps> = ({ data }) => {
    return (
        <div className="p-6 rounded-2xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Ventas por Categoría
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Rendimiento por categoría
                </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                    <XAxis
                        dataKey="category"
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
                    <Bar
                        dataKey="sales"
                        fill="#3b82f6"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
