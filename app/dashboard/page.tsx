"use client"
import AreaChartComponent from "@/components/areachart";
import TopProductComponent from "@/components/topproduct";
import Ordenes from "@/components/ordenes";
import CardProgressViews from "@/components/countViewsSite";
import CardProducts from "@/components/products/card";
import { Card, CardBody } from "@nextui-org/react";


export default function DashboardLayout() {
  return (
    <div className="z-index gap-4 grid ">
     
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 h-[8rem] md:h-[12rem]">
      <CardProgressViews  />
        <Card isBlurred className="border-none bg-background/50 dark:bg-sky-800/40 max-w-[610px]">
          <CardBody className="p-0">
            <AreaChartComponent />
          </CardBody>
        </Card>
        <Card isBlurred className="md:flex hidden border-none bg-background/50 dark:bg-sky-800/40 max-w-[610px]">
          <CardBody>
          <TopProductComponent />
          </CardBody>
        </Card>

        <Card isBlurred className="md:flex hidden border-none bg-background/50 dark:bg-sky-800/40 max-w-[610px]">
          <CardBody>
          </CardBody>
        </Card>

      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 h-[25rem]">
        <Card isBlurred className="sm:p-0 border-none bg-background/50 dark:bg-sky-800/40 max-w-[610px]">
          <CardBody>
            <CardProducts />
          </CardBody>
        </Card>

        <Card isBlurred className="md:col-span-2 md:flex hidden border-none bg-background/50 dark:bg-sky-800/40">
          <CardBody>
          <Ordenes />
          </CardBody>
        </Card>
      </div>


    </div>
  );
}
