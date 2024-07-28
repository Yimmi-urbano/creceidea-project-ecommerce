"use client"
import AreaChartComponent from "@/components/areachart";
import TopProductComponent from "@/components/topproduct";
import Ordenes from "@/components/ordenes";
import CardProgressViews from "@/components/countViewsSite";
import CardProducts from "@/components/products/card";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { ProductProvider } from "@/hooks/contextProduct";


export default function DashboardLayoutPage() {
  return (
    <div className="z-index gap-4 grid ">
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 h-[8rem] md:h-[12rem]">
        <CardProgressViews />
        <AreaChartComponent />
        <TopProductComponent />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 h-[25rem]">
        <Card isBlurred className="sm:p-0 border-none bg-background/50 dark:bg-sky-950/30 max-w-[610px]">
        <CardHeader className="bg-transparent pl-4 pr-4 pb-3 pt-3 flex justify-between">
        <h2 className="text-sm md:text-xl font-semibold text-gray-600 dark:text-white">Productos</h2>
      </CardHeader>
          <CardBody>
            <ProductProvider>
              <CardProducts />
            </ProductProvider>
          </CardBody>
        </Card>
        <Card isBlurred className="md:col-span-2 md:flex hidden border-none bg-background/50 dark:bg-sky-950/30">
          <CardBody>
            <Ordenes />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
