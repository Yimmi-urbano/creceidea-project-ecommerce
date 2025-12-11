"use client"
import ProductForm from "@/src/presentation/components/client/products/new-product";
import { ConfigProvider } from "@/src/presentation/contexts";
import { Card, CardBody } from "@nextui-org/react";

export default function NewProducts() {
  return (
    <ConfigProvider >
      <ProductForm />
      </ConfigProvider >
  );
}
