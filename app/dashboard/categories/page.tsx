"use client";

import React from 'react';
import AddCategory from '@/components/category/addCategory';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import CategoryList from '@/components/category/CategoryList';
import { CategoryProvider } from '@/components/category/CategoryContext';

const PageCategories: React.FC = () => {
  return (
    <CategoryProvider>
      <Card isBlurred className="border-none bg-background/50 dark:bg-sky-950/30">
        <CardHeader className="bg-transparent flex justify-between">
          <h2 className="text-xl font-semibold text-gray-600 dark:text-white">Categorías</h2>
          <AddCategory />
        </CardHeader>
        <CardBody>
          <CategoryList />
        </CardBody>
      </Card>
    </CategoryProvider>
  );
};

export default PageCategories;
