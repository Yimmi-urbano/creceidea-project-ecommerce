import React, { useEffect, useState } from 'react';

import { ChevronDown, Edit3, FolderOpen, Plus, Trash2 } from 'lucide-react';

import { Category, CategoryWithCount } from '@/src/domain/categories/Category';

import { CategoryIcon } from './CategoryIcon';
import { SubCategoryRow } from './SubCategoryRow';

interface CategoryRowProps {
	item: Category | CategoryWithCount;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onAddSubcategory: (parentId: string) => void;
	autoExpand?: boolean;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
	item,
	onEdit,
	onDelete,
	onAddSubcategory,
	autoExpand = false,
}) => {
	const [isOpen, setIsOpen] = useState(autoExpand);
	const hasChildren = item.children && item.children.length > 0;

	// Auto-expandir cuando cambia autoExpand
	useEffect(() => {
		if (autoExpand) {
			setIsOpen(true);
		}
	}, [autoExpand]);

	return (
		<div className="mb-3 select-none">
			{/* Tarjeta Principal */}
			<div
				role="button"
				tabIndex={0}
				className={`
          relative flex items-center justify-between p-4 bg-white dark:bg-dark-card border rounded-xl cursor-pointer transition-all duration-200 shadow-sm
          ${
						isOpen
							? 'border-primary ring-1 ring-primary/20 shadow-md'
							: 'border-zinc-200 dark:border-zinc-800 hover:border-primary/30 dark:hover:border-primary/30'
					}
        `}
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setIsOpen(!isOpen);
					}
				}}
			>
				<div className="flex items-center gap-4">
					{/* Icono + Título */}
					<CategoryIcon url={item.icon_url} alt={item.title} />

					<div className="flex flex-col">
						<h3
							className={`font-semibold text-base ${isOpen ? 'text-primary' : 'text-zinc-800 dark:text-zinc-200'}`}
						>
							{item.title}
						</h3>
						<div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
							<span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
								/{item.slug}
							</span>
							{(item as any).productCount > 0 && (
								<span>• {(item as any).productCount} productos</span>
							)}
						</div>
					</div>
				</div>

				{/* Acciones derecha */}
				<div className="flex items-center gap-3">
					{hasChildren && (
						<div
							className={`
              flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors
              ${isOpen ? 'bg-primary/10 text-primary' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}
            `}
						>
							<span>{item.children?.length} subcat.</span>
						</div>
					)}

					{/* Separador vertical */}
					<div className="h-8 w-px bg-zinc-100 dark:bg-zinc-800 mx-1 hidden sm:block" />

					{/* Botones de acción */}
					<div className="flex items-center gap-1">
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit(item._id);
							}}
							className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors hidden sm:block"
							title="Editar"
						>
							<Edit3 size={18} />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete(item._id);
							}}
							className="p-2 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors hidden sm:block"
							title="Eliminar"
						>
							<Trash2 size={18} />
						</button>

						{/* Botón expandir/contraer - NO detiene propagación */}
						<div
							className={`
              p-2 rounded-lg transition-transform duration-300 text-zinc-400 cursor-pointer
              ${isOpen ? 'rotate-180 text-primary' : ''}
            `}
						>
							<ChevronDown size={20} />
						</div>
					</div>
				</div>
			</div>

			{/* Área de Hijos (Acordeón) */}
			<div
				className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
        `}
			>
				<div className="pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 ml-6 py-2 space-y-1">
					{/* Header de subsección */}
					<div className="flex items-center justify-between mb-3 px-2">
						<span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-4 flex items-center gap-2">
							<FolderOpen size={12} /> Subcategorías de {item.title}
						</span>
						<button
							onClick={() => onAddSubcategory(item._id)}
							className="text-xs font-medium text-primary hover:text-primary-hover flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md hover:bg-primary/20 transition-colors"
						>
							<Plus size={12} /> Nueva Subcategoría
						</button>
					</div>

					{hasChildren ? (
						(item.children as Category[]).map((child) => (
							<SubCategoryRow key={child._id} item={child} onEdit={onEdit} onDelete={onDelete} />
						))
					) : (
						<div className="ml-8 p-4 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/20">
							<p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
								No hay subcategorías aún.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
