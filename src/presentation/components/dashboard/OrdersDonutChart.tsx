'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface OrdersDonutChartProps {
    data: Array<{ name: string; value: number; color: string }>;
}

export const OrdersDonutChart: React.FC<OrdersDonutChartProps> = ({ data }) => {
    return (
        <div className="p-6 rounded-2xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Estado de Pedidos
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Distribución actual
                </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value: any) => [`${value} pedidos`, '']}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
