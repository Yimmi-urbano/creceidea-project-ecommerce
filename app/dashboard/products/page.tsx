"use client"
import CardProducts from "@/components/products/card";
import { Card, CardBody } from "@nextui-org/react";


  export default function PageProducts({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="">
  <Card isBlurred className="md:flex hidden border-none bg-background/50 dark:bg-sky-950/30">
          <CardBody>
          <CardProducts />
          </CardBody>
        </Card>
  {children}
    </div>
  );
}
