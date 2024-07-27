"use client";
import React from 'react';
import CardProductEdit from '@/components/products/cardProductEdit';
import Paginator from '@/components/products/paginator';
import { ProductProvider } from '@/hooks/contextProduct';
import { Button, Card, CardBody, CardFooter, CardHeader, Link} from '@nextui-org/react';


export default function PageProducts() {
  return (
    <Card isBlurred className="border-none p-0 bg-background/50 dark:bg-sky-950/30">
      <CardHeader className="bg-transparent flex justify-between">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white">Productos</h2>
        <Button isIconOnly color='success' className='text-lg' href='/dashboard/products/create' as={Link}>+</Button>

      </CardHeader>
      <ProductProvider>
    
        <CardBody className="h-[24rem] md:h-[31rem]">
          <CardProductEdit />
        </CardBody>
        <CardFooter className="p-0">
          <Paginator />
        </CardFooter>
      </ProductProvider>
    </Card>
  );
}
