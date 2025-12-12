import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: React.ElementType;
    iconColor?: string;
    trend?: 'up' | 'down';
}

export const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    change,
    changeLabel = 'vs mes anterior',
    icon: Icon,
    iconColor = 'bg-primary',
    trend
}) => {
    const isPositive = trend === 'up' || (change && change > 0);
    const isNegative = trend === 'down' || (change && change < 0);

    return (
        <div className="p-6 rounded-2xl border transition-all hover:shadow-lg bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${iconColor} bg-opacity-10`}>
                    <Icon size={24} className={iconColor.replace('bg-', 'text-')} />
                </div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' :
                        isNegative ? 'text-rose-600 dark:text-rose-400' :
                            'text-zinc-500'
                        }`}>
                        {isPositive && <TrendingUp size={16} />}
                        {isNegative && <TrendingDown size={16} />}
                        <span>{change > 0 ? '+' : ''}{change}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                {title}
            </h3>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {value}
            </p>
            {changeLabel && (
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {changeLabel}
                </p>
            )}
        </div>
    );
};
