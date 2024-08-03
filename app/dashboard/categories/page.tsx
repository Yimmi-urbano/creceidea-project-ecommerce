"use client";

import React, { useState, useEffect } from 'react';
import { PlusIcon, EditProductIcon, ShareIcon, EyeFilledIcon, MiniTrashIcon } from '../../../components/icons';
import AddCategory from '@/components/products/addCategory';
import { fetchCategories, deleteCategory } from '@/hooks/fetchProducts';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';

interface Category {
  _id: string;
  title: string;
  icon_url: string;
}

const CategoryCard: React.FC<{ category: Category, onDelete: (id: string) => void }> = ({ category, onDelete }) => {
  const { _id, title, icon_url } = category;

  return (
    <Card isBlurred className="w-full rounded-lg flex flex-row border-none bg-background/70 dark:bg-sky-950/30">
      <div className="flex items-center gap-4 p-2 flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex flex-row justify-center items-center gap-3 pr-3">
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          className="p-0 min-w-6 w-6 h-6 rounded-md"
          aria-label="Eliminar"
          onClick={() => onDelete(_id)}
        >
          <MiniTrashIcon size={18} />
        </Button>
      </div>
    </Card>
  );
};

const PageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData: Category[] = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    loadCategories();
  }, []);

  const handleDeleteCategory = async (_id: string) => {
    try {
      await deleteCategory(_id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== _id)
      );
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  return (
    <Card isBlurred className="border-none bg-background/50 dark:bg-sky-950/30">
      <CardHeader className="bg-transparent flex justify-between">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white">Productos</h2>
        <AddCategory />
      </CardHeader>
      <CardBody>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} onDelete={handleDeleteCategory} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default PageCategories;
