"use client";
import React from 'react';
import CardProductEdit from '@/components/products/cardProductEdit';
import Paginator from '@/components/products/paginator';
import { ProductProvider } from '@/hooks/contextProduct';
import { Button, Card, CardBody, CardFooter, CardHeader, Link} from '@nextui-org/react';
import HeaderProducts from '@/components/products/header';

export default function PageProducts() {
  return (
    <Card shadow="none" className="p-0 h-full  border-[#0ea5e9]/0 bg-[#0c4a6e]/0 ">
      <ProductProvider>
        <HeaderProducts/>
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
