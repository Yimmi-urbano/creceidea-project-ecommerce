"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCategories, updateCategory, deleteCategory, addCategory } from '@/hooks/fetchProducts';

interface Category {
  _id: string;
  title: string;
  icon_url: string;
  parent: string | null;
  productCount: number;
  slug: string;
  children: Category[];
}

interface CategoryContextProps {
  categories: Category[];
  allCategories: { id: string, title: string }[];
  message: string;
  fetchAndSetCategories: () => void;
  handleUpdateCategory: (id: string, title: string, parent: string | null) => Promise<void>;
  handleDeleteCategory: (id: string) => Promise<void>;
  handleAddCategory: (title: string, parent: string | null) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<{ id: string, title: string }[]>([]);
  const [message, setMessage] = useState<string>('');

  const flattenCategories = (categories: Category[], level: number = 0): { id: string, title: string }[] => {
    let result: { id: string, title: string }[] = [];
    for (const category of categories) {
      result.push({ id: category._id, title: `${'-'.repeat(level)} ${category.title}` });
      if (category.children.length > 0) {
        result = result.concat(flattenCategories(category.children, level + 1));
      }
    }
    return result;
  };

  const fetchAndSetCategories = async () => {
    try {
      const data = await fetchCategories();
      // Handle categories with invalid parent ids
      const updateCategoriesWithValidParents = (categories: Category[]): Category[] => {
        return categories.map(category => ({
          ...category,
          children: updateCategoriesWithValidParents(category.children),
          parent: allCategories.find(cat => cat.id === category.parent) ? category.parent : null
        }));
      };

      const validCategories = updateCategoriesWithValidParents(data);
      setCategories(validCategories);
      setAllCategories(flattenCategories(validCategories));
      setMessage('');
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const handleUpdateCategory = async (id: string, title: string, parent: string | null) => {
    try {
      const validParent = allCategories.find(cat => cat.id === parent) ? parent : null;
      await updateCategory(id, title, validParent);
      setMessage('Categoría actualizada con éxito');
      await fetchAndSetCategories();
    } catch (error) {
      setMessage('Error al actualizar la categoría');
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        await deleteCategory(id);
        await fetchAndSetCategories();
      } catch (error) {
        console.error('Error al eliminar la categoría:', error);
      }
    }
  };

  const handleAddCategory = async (title: string, parent: string | null) => {
    try {
      const validParent = allCategories.find(cat => cat.id === parent) ? parent : null;
      await addCategory(title, validParent);
      setMessage('Categoría agregada con éxito');
      await fetchAndSetCategories();
    } catch (error) {
      setMessage('Error al agregar la categoría');
      console.error(error);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, allCategories, message, fetchAndSetCategories, handleUpdateCategory, handleDeleteCategory, handleAddCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
