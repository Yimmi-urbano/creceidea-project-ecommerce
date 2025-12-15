"use client";

import React, { useState } from 'react';
import { CategoryProvider, useCategoryContext } from '@/src/presentation/components/client/category/CategoryContext';
import { Edit2, Trash2, Search, Plus, ChevronDown, FolderOpen, Folder } from 'lucide-react';
import AddCategory from '@/src/presentation/components/client/category/AddCategory';
import { Skeleton } from '@nextui-org/react';

// Componente para icono de categoría con fallback
const CategoryIcon = ({ url, alt }: { url?: string; alt: string }) => {
  const [error, setError] = useState(false);

  if (error || !url || url.includes('placeholder')) {
    return (
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Folder size={18} />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      onError={() => setError(true)}
      className="w-10 h-10 rounded-lg object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
    />
  );
};

// Componente de subcategoría
const SubCategoryRow = ({ item, onEdit, onDelete }: { item: any; onEdit: (id: string) => void; onDelete: (id: string) => void }) => {
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
          <Edit2 size={14} />
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

// Componente principal de categoría (padre)
const CategoryRow = ({ item, onEdit, onDelete, onAddSubcategory }: {
  item: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubcategory: (parentId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="mb-3 select-none">
      {/* Tarjeta Principal */}
      <div
        className={`
          relative flex items-center justify-between p-4 bg-white dark:bg-dark-card border rounded-xl cursor-pointer transition-all duration-200 shadow-sm
          ${isOpen
            ? 'border-primary ring-1 ring-primary/20 shadow-md'
            : 'border-zinc-200 dark:border-zinc-800 hover:border-primary/30 dark:hover:border-primary/30'
          }
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          {/* Icono + Título */}
          <CategoryIcon url={item.icon_url} alt={item.title} />

          <div className="flex flex-col">
            <h3 className={`font-semibold text-base ${isOpen ? 'text-primary' : 'text-zinc-800 dark:text-zinc-200'}`}>
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                /{item.slug}
              </span>
              {item.productCount > 0 && (
                <span>• {item.productCount} productos</span>
              )}
            </div>
          </div>
        </div>

        {/* Acciones derecha */}
        <div className="flex items-center gap-3">
          {hasChildren && (
            <div className={`
              flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors
              ${isOpen ? 'bg-primary/10 text-primary' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}
            `}>
              <span>{item.children.length} subcat.</span>
            </div>
          )}

          {/* Separador vertical */}
          <div className="h-8 w-px bg-zinc-100 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

          {/* Botones de acción */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onEdit(item._id)}
              className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors hidden sm:block"
            >
              <Edit2 size={18} />
            </button>

            {/* Botón expandir/contraer */}
            <div className={`
              p-2 rounded-lg transition-transform duration-300 text-zinc-400
              ${isOpen ? 'rotate-180 text-primary' : ''}
            `}>
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
            item.children.map((child: any) => (
              <SubCategoryRow
                key={child._id}
                item={child}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="ml-8 p-4 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/20">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">No hay subcategorías aún.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function CategoriesContent() {
  const { categories, handleDeleteCategory, loading } = useCategoryContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar categorías
  const filteredCategories = categories?.filter(cat =>
    cat?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calcular estadísticas
  const totalCategories = categories?.length || 0;
  const visibleCategories = filteredCategories.length;
  const activeCategories = filteredCategories.filter((cat: any) => cat.is_active)?.length || 0;

  const handleEdit = (id: string) => {
    console.log('Edit category:', id);
    // TODO: Implementar modal de edición
  };

  const handleAddSubcategory = (parentId: string) => {
    console.log('Add subcategory to:', parentId);
    // TODO: Abrir modal con parent preseleccionado
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Categorías</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Organiza cómo verán tus clientes el catálogo de productos.
          </p>
        </div>
        <AddCategory />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md relative group">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors"
        />
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-primary bg-white dark:bg-dark-card"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
                <Skeleton className="h-3 w-24 rounded-lg mb-3 bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-8 w-12 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                {searchTerm ? 'Visibles' : 'Total de Categorías'}
              </p>
              <p className={`text-2xl font-bold ${searchTerm ? 'text-primary' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {searchTerm ? visibleCategories : totalCategories}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                Activas
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {activeCategories}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                Con Subcategorías
              </p>
              <p className="text-2xl font-bold text-primary">
                {filteredCategories.filter((cat: any) => cat.children && cat.children.length > 0).length}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Categories List */}
      <div className="space-y-1">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <Skeleton className="h-5 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800 mb-2" />
                    <Skeleton className="h-4 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>
                <Skeleton className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((category: any) => (
            <CategoryRow
              key={category._id}
              item={category}
              onEdit={handleEdit}
              onDelete={handleDeleteCategory}
              onAddSubcategory={handleAddSubcategory}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">No se encontraron categorías</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              {searchTerm ? 'Intenta con otro término de búsqueda.' : 'Comienza agregando tu primera categoría'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PageCategories() {
  return (
    <CategoryProvider>
      <CategoriesContent />
    </CategoryProvider>
  );
}
