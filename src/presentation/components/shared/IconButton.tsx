import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
    icon: LucideIcon;
    onClick?: () => void;
    variant?: 'ghost' | 'primary' | 'danger' | 'outline';
    className?: string;
    size?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon: Icon,
    onClick,
    variant = 'ghost',
    className = '',
    size = 18,
}) => {
    const baseStyle = "p-2 rounded-lg transition-all duration-200 flex items-center justify-center";
    const variants = {
        ghost: "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white",
        primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
        danger: "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10",
        outline: "border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
            <Icon size={size} strokeWidth={2} />
        </button>
    );
};
