"use client";

import React, { useState } from 'react';
import { CategoryProvider, useCategoryContext } from '@/src/presentation/components/client/category/CategoryContext';
import { Edit2, Trash2, Search } from 'lucide-react';
import AddCategory from '@/src/presentation/components/client/category/addCategory';

function CategoriesContent() {
  const { allCategories, handleDeleteCategory } = useCategoryContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = allCategories?.filter(cat =>
    cat?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const toggleSelect = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map(cat => cat.id));
    }
  };

  const deleteSelected = () => {
    selectedCategories.forEach(id => handleDeleteCategory(id));
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Categorías</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Administra todas tus categorías de productos
          </p>
        </div>
        <AddCategory />
      </div>

      {/* Search and Actions */}
      <div className="flex gap-4">
        <div className="flex-1 relative group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#00A09D] transition-colors"
          />
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-[#00A09D] bg-white dark:bg-[#13161c]"
          />
        </div>
        {selectedCategories.length > 0 && (
          <button
            onClick={deleteSelected}
            className="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-medium px-4 py-2.5 rounded-lg text-sm transition-colors"
          >
            <Trash2 size={16} />
            Eliminar ({selectedCategories.length})
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Total de Categorías
          </p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {allCategories?.length || 0}
          </p>
        </div>
        <div className="p-4 rounded-lg border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Visibles
          </p>
          <p className="text-2xl font-bold text-[#00A09D]">
            {filteredCategories?.length || 0}
          </p>
        </div>
        <div className="p-4 rounded-lg border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Seleccionadas
          </p>
          <p className="text-2xl font-bold text-amber-500">
            {selectedCategories?.length || 0}
          </p>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-2">
        {/* Header Checkbox */}
        <div className="flex items-center gap-4 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <input
            type="checkbox"
            checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
            onChange={toggleAll}
            className="w-4 h-4 rounded accent-[#00A09D] cursor-pointer"
          />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Nombre
          </span>
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category: any) => (
            <div
              key={category.id}
              className="group flex items-center gap-4 px-4 py-3.5 bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-[#00A09D]/30 dark:hover:border-[#00A09D]/30 hover:shadow-sm transition-all duration-200"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleSelect(category.id)}
                className="w-4 h-4 rounded accent-[#00A09D] cursor-pointer"
              />
              <span className="flex-1 text-zinc-900 dark:text-zinc-100 font-medium text-sm">
                {category.title}
              </span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-[#00A09D]/10 rounded-lg text-[#00A09D] transition-colors">
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-rose-600 dark:text-rose-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <p className="text-zinc-500 dark:text-zinc-400 mb-1">No se encontraron categorías</p>
            <p className="text-zinc-400 dark:text-zinc-500 text-sm">
              {searchTerm ? 'Intenta con otro término de búsqueda' : 'Comienza agregando tu primera categoría'}
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
