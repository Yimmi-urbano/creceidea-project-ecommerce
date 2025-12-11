"use client";

import React from 'react';
import AddCategory from '@/src/presentation/components/client/category/addCategory';
import { Card, CardBody, CardHeader, ScrollShadow } from '@nextui-org/react';
import CategoryList from '@/src/presentation/components/client/category/CategoryList';
import { CategoryProvider } from '@/src/presentation/components/client/category/CategoryContext';

const PageCategories: React.FC = () => {
  return (
    <CategoryProvider>
      <Card  shadow="none" className="border-none bg-transparent h-[80vh]">
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
