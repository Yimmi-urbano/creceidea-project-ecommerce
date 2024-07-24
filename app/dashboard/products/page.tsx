"use client"
import CardProducts from "@/components/products/card";
import CardProductEdit from "@/components/products/cardProductEdit";
import { ProductProvider } from "@/hooks/contextProduct";
import { Card, CardBody } from "@nextui-org/react";


export default function PageProducts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:h-screen">
      <Card isBlurred className="border-none bg-background/50 dark:bg-sky-950/30">
        <CardBody>
          <ProductProvider>
            <CardProductEdit />
          </ProductProvider>
        </CardBody>
      </Card>
      {children}
    </div>
  );
}
