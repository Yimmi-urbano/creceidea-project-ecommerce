import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCategories, updateCategory, deleteCategory, createCategory } from '@/src/application/categories/categoryServices';

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
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(true);
      const data = await getCategories();
      // @ts-ignore - Category type mismatch is handled
      setCategories(data);
      // @ts-ignore - Category type mismatch is handled
      setAllCategories(flattenCategories(data));
      setMessage('');
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const handleUpdateCategory = async (id: string, title: string, parent: string | null) => {
    try {

      if (id === parent) {

        setMessage('No puede asignarse a sí mismo como categoría principal');
        await fetchAndSetCategories();

      } else {

        await updateCategory(id, title, parent);
        setMessage('Categoría actualizada con éxito');
        await fetchAndSetCategories();
      }

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
      await createCategory(title, parent);
      setMessage('Categoría agregada con éxito');
      await fetchAndSetCategories();
    } catch (error) {
      setMessage('Error al agregar la categoría');
      console.error(error);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, allCategories, message, loading, fetchAndSetCategories, handleUpdateCategory, handleDeleteCategory, handleAddCategory }}>
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
