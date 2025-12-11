import React from 'react';

interface BadgeProps {
    status: string;
    type?: 'default' | 'order' | 'billing' | 'service';
}

export const Badge: React.FC<BadgeProps> = ({ status, type = 'default' }) => {
    let styles = '';
    let label = status;
    let dotColor = '';

    if (type === 'order') {
        if (status === 'completed') {
            styles = 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
            label = 'Completado';
            dotColor = 'bg-blue-500';
        } else if (status === 'pending') {
            styles = 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
            label = 'Pendiente';
            dotColor = 'bg-amber-500';
        } else {
            styles = 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
            label = 'Cancelado';
            dotColor = 'bg-rose-500';
        }
    } else if (type === 'billing') {
        if (status === 'paid') {
            styles = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
            label = 'Pagado';
            dotColor = 'bg-emerald-500';
        } else {
            styles = 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
            label = 'Pendiente';
            dotColor = 'bg-rose-500';
        }
    } else if (type === 'service') {
        if (status === 'active') {
            styles = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
            label = 'Activo';
            dotColor = 'bg-emerald-500';
        } else if (status === 'warning') {
            styles = 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
            label = 'Por Vencer';
            dotColor = 'bg-amber-500';
        } else {
            styles = 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
            label = 'Inactivo';
            dotColor = 'bg-zinc-500';
        }
    } else {
        // Default Product Status
        styles = status === 'active'
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';

        label = status === 'active' ? 'Activo' : 'Inactivo';
        dotColor = status === 'active' ? 'bg-emerald-500' : 'bg-zinc-500';
    }

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles} flex items-center gap-1.5 w-fit`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
            {label}
        </span>
    );
};
