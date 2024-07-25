// PageProducts.tsx
"use client";

import React from 'react';
import CardProductEdit from '@/components/products/cardProductEdit';
import Paginator from '@/components/products/paginator';
import { ProductProvider } from '@/hooks/contextProduct';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

export default function PageProducts() {
  return (
    <Card isBlurred className="border-none p-0 bg-background/50 dark:bg-sky-950/30">
      <CardHeader className="bg-transparent">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white">Productos</h2>
      </CardHeader>
      <ProductProvider>
        <div className="md:fixed flex right-2 top-3 z-10 w-full md:w-[350px]">
          <div className="flex-wrap w-full ml-3 mr-3">  
            
          </div>
        </div>
        <CardBody className="h-[24rem] md:h-[34rem]">
          <CardProductEdit />
        </CardBody>
        <CardFooter className="p-0">
          <Paginator />
        </CardFooter>
      </ProductProvider>
    </Card>
  );
}
