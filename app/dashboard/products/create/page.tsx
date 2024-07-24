"use client"
import AreaChartComponent from "@/components/areachart";
import CardProgressViews from "@/components/countViewsSite";
import CardProducts from "@/components/products/card";
import { Card, CardBody } from "@nextui-org/react";


export default function NewProducts() {
  return (
    <div className="flex md:h-screen">
  
  <div className="flex p-4 gap-4 flex flex-wrap">
  <Card isBlurred className="md:flex hidden border-none bg-background/50 dark:bg-sky-950/30">
  columna 1
</Card>
     
      </div>
      <div className="flex-1 p-4 gap-4 flex flex-wrap">
      <Card isBlurred className="md:flex hidden border-none bg-background/50 dark:bg-sky-950/30">
  columna 2
</Card>
      </div>
    </div>
  );
}
