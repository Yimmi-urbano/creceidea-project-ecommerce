"use client"
import ProductForm from "@/components/products/new-product";
import { Card, CardBody } from "@nextui-org/react";

export default function NewProducts() {
  return (
    <Card isBlurred className="md:h-[85vh] border-none bg-background/50 dark:bg-sky-950/30 w-[100%]">
      <ProductForm />
    </Card>
  );
}
