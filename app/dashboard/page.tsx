"use client"
import AreaChartComponent from "@/components/areachart";
import TopProductComponent from "@/components/topproduct";
import Ordenes from "@/components/ordenes";
import CardProgressViews from "@/components/countViewsSite";
import CardProducts from "@/components/products/card";
import { Card, CardBody, CardHeader, Link, Button, CardFooter } from "@nextui-org/react";
import { ProductProvider } from "@/hooks/contextProduct";
import CardProductEdit from '@/components/products/cardProductEdit';
import Paginator from '@/components/products/paginator';


export default function DashboardLayoutPage() {
  return (

    <div className="z-index gap-4 grid ">

      {/**? 
<Card shadow="none" className="p-0 h-full  border-[#0ea5e9]/0 bg-[#0c4a6e]/0 ">

      <CardHeader className="bg-transparent flex justify-between">
        <span className="text-xl font-semibold text-gray-600 dark:text-white">Productos</span>
        <Button isIconOnly color='warning' className='text-lg' href='/dashboard/products/create' as={Link}>+</Button>

      </CardHeader>
      <ProductProvider>
        <CardBody className="h-[24rem] md:h-[31rem]">
          <CardProductEdit />
        </CardBody>
        <CardFooter className="p-0">
          <Paginator />
        </CardFooter>
      </ProductProvider>
    </Card>
*/}

      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 h-[12rem] md:h-[12rem]">
        <CardProgressViews />
        <AreaChartComponent />
        <TopProductComponent />
      </div>

    </div>
  );
}
