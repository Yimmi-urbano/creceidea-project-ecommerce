"use client"
import CardProductEdit from "@/components/products/cardProductEdit";
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
