"use client"
import CardProductEdit from "@/components/products/cardProductEdit";
import CategoryFilter from "@/components/products/categorySelect";
import ProductFilter from "@/components/products/inputSearch";
import Paginator from "@/components/products/paginator";
import { ProductProvider } from "@/hooks/contextProduct";
import { Card, CardBody, CardFooter,CardHeader } from "@nextui-org/react";

export default function PageProducts() {

  return (
      <Card isBlurred className="border-none p-3 bg-background/50 dark:bg-sky-950/30">
        <CardHeader>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white mb-4">Productos</h2>
        
        </CardHeader>
        <ProductProvider>
          <div className="md:fixed flex gap-3 right-3 z-10 w-full md:w-[350px]">
        <div className="flex-wrap w-full">  <ProductFilter /></div>
          </div>
        
          <CardBody className="h-[30rem]">
            <CardProductEdit />
          </CardBody>
          <CardFooter>
            <Paginator />
          </CardFooter>
        </ProductProvider>
      </Card>
  );
}
