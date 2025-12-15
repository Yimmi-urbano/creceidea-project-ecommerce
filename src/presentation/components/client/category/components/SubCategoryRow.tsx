import React from 'react';
import { Edit3, Trash2, FolderOpen } from 'lucide-react';

interface SubCategoryRowProps {
    item: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const SubCategoryRow: React.FC<SubCategoryRowProps> = ({ item, onEdit, onDelete }) => {
    return (
        <div className="group flex items-center justify-between p-3 ml-8 mb-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-primary/30 dark:hover:border-primary/30 rounded-lg transition-all duration-200">
            <div className="flex items-center gap-3">
                {/* Línea conectora visual */}
                <div className="w-4 h-px bg-zinc-300 dark:bg-zinc-700 -ml-4"></div>

                <div className="w-8 h-8 rounded-full bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                    <FolderOpen size={14} className="text-zinc-500 dark:text-zinc-400" />
                </div>
                <div>
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300 text-sm">{item.title}</h4>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {item.productCount || 0} productos
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(item._id)}
                    className="p-1.5 text-zinc-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    title="Editar"
                >
                    <Edit3 size={14} />
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors"
                    title="Eliminar"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};
