import { useState, useEffect } from 'react';
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

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<{ id: string, title: string }[]>([]);
  const [message, setMessage] = useState<string>('');

  const fetchAndSetCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      setAllCategories(flattenCategories(data));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const handleUpdateCategory = async (id: string, title: string, parent: string | null) => {
    try {
      await updateCategory(id, title, parent);
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
      await addCategory(title, parent);
      setMessage('Categoría agregada con éxito');
      await fetchAndSetCategories();
    } catch (error) {
      setMessage('Error al agregar la categoría');
      console.error(error);
    }
  };

  return {
    categories,
    allCategories,
    message,
    handleUpdateCategory,
    handleDeleteCategory,
    handleAddCategory,
  };
};
