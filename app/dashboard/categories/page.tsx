"use client";

import React, { useState } from 'react';
import { CategoryProvider, useCategoryContext } from '@/src/presentation/components/client/category/CategoryContext';
import { Search } from 'lucide-react';
import AddCategory from '@/src/presentation/components/client/category/AddCategory';
import { Skeleton } from '@nextui-org/react';
import { CategoryRow, CategoryModals } from '@/src/presentation/components/client/category/components';

function CategoriesContent() {
  const { categories, handleDeleteCategory, handleAddCategory, handleUpdateCategory, allCategories, loading } = useCategoryContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para modales
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);

  // Estados para datos de edición/eliminación
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  // Estados para nueva subcategoría
  const [newSubcategoryTitle, setNewSubcategoryTitle] = useState('');
  const [subcategoryParentId, setSubcategoryParentId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Función de búsqueda avanzada
  const searchInCategory = (category: any, searchLower: string): boolean => {
    // Buscar en el título de la categoría
    if (category.title?.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Buscar en el slug de la categoría
    if (category.slug?.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Buscar en las subcategorías (título y slug)
    if (category.children && category.children.length > 0) {
      return category.children.some((child: any) =>
        child.title?.toLowerCase().includes(searchLower) ||
        child.slug?.toLowerCase().includes(searchLower)
      );
    }

    return false;
  };

  // Función para detectar si hay coincidencias solo en subcategorías
  const hasSubcategoryMatch = (category: any, searchLower: string): boolean => {
    if (!searchLower) return false;

    // Si la categoría padre coincide, no es solo subcategoría
    if (category.title?.toLowerCase().includes(searchLower) ||
      category.slug?.toLowerCase().includes(searchLower)) {
      return false;
    }

    // Verificar si alguna subcategoría coincide
    if (category.children && category.children.length > 0) {
      return category.children.some((child: any) =>
        child.title?.toLowerCase().includes(searchLower) ||
        child.slug?.toLowerCase().includes(searchLower)
      );
    }

    return false;
  };

  // Filtrar categorías con búsqueda avanzada
  const filteredCategories = categories?.filter(cat => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return searchInCategory(cat, searchLower);
  }) || [];

  // Calcular estadísticas
  const totalCategories = categories?.length || 0;
  const visibleCategories = filteredCategories.length;
  const activeCategories = filteredCategories.filter((cat: any) => cat.is_active)?.length || 0;

  // Función auxiliar para encontrar categoría por ID
  const findCategoryById = (cats: any[], id: string): any => {
    for (const cat of cats) {
      if (cat._id === id) return cat;
      if (cat.children && cat.children.length > 0) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Abrir modal de edición
  const handleEdit = (id: string) => {
    const category = findCategoryById(categories, id);
    if (category) {
      setSelectedCategoryId(id);
      setSelectedCategoryTitle(category.title);
      setSelectedParentId(category.parent);
      setIsEditModalOpen(true);
    }
  };

  // Abrir modal de eliminación
  const handleDeleteClick = (id: string) => {
    setSelectedCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  // Abrir modal de agregar subcategoría
  const handleAddSubcategory = (parentId: string) => {
    setSubcategoryParentId(parentId);
    setNewSubcategoryTitle('');
    setIsSubcategoryModalOpen(true);
  };

  // Guardar edición
  const handleSaveEdit = async () => {
    if (!selectedCategoryId || !selectedCategoryTitle.trim()) return;

    setIsLoading(true);
    try {
      await handleUpdateCategory(selectedCategoryId, selectedCategoryTitle, selectedParentId);
      setIsEditModalOpen(false);
      setSelectedCategoryId(null);
      setSelectedCategoryTitle('');
      setSelectedParentId(null);
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!selectedCategoryId) return;

    setIsLoading(true);
    try {
      await handleDeleteCategory(selectedCategoryId);
      setIsDeleteModalOpen(false);
      setSelectedCategoryId(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Guardar nueva subcategoría
  const handleSaveSubcategory = async () => {
    if (!newSubcategoryTitle.trim() || !subcategoryParentId) return;

    setIsLoading(true);
    try {
      await handleAddCategory(newSubcategoryTitle, subcategoryParentId);
      setIsSubcategoryModalOpen(false);
      setNewSubcategoryTitle('');
      setSubcategoryParentId(null);
    } catch (error) {
      console.error('Error adding subcategory:', error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="space-y-2">
        <div className="flex-1 max-w-md relative group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Buscar por nombre, slug o subcategorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-primary bg-white dark:bg-dark-card"
          />
        </div>
        {searchTerm && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
            Buscando en categorías, subcategorías y slugs...
          </p>
        )}
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
              onDelete={handleDeleteClick}
              onAddSubcategory={handleAddSubcategory}
              autoExpand={hasSubcategoryMatch(category, searchTerm.toLowerCase())}
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

      {/* Modals */}
      <CategoryModals
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedCategoryTitle={selectedCategoryTitle}
        setSelectedCategoryTitle={setSelectedCategoryTitle}
        selectedParentId={selectedParentId}
        setSelectedParentId={setSelectedParentId}
        allCategories={allCategories}
        handleSaveEdit={handleSaveEdit}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleConfirmDelete={handleConfirmDelete}
        isSubcategoryModalOpen={isSubcategoryModalOpen}
        setIsSubcategoryModalOpen={setIsSubcategoryModalOpen}
        newSubcategoryTitle={newSubcategoryTitle}
        setNewSubcategoryTitle={setNewSubcategoryTitle}
        handleSaveSubcategory={handleSaveSubcategory}
        isLoading={isLoading}
      />
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
