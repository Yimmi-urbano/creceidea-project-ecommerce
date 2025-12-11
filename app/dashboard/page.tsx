"use client"
import AreaChartComponent from "@/src/presentation/components/shared/areachart";
import TopProductComponent from "@/src/presentation/components/client/topproduct";
import Ordenes from "@/src/presentation/components/client/ordenes";
import CardProgressViews from "@/src/presentation/components/client/countViewsSite";
import CardProducts from "@/src/presentation/components/shared/products/card";
import { Card, CardBody, CardHeader, Link, Button, CardFooter} from "@nextui-org/react";
import { ProductProvider } from "@/src/presentation/contexts";
import CardProductEdit from '@/src/presentation/components/client/products/cardProductEdit';
import Paginator from '@/src/presentation/components/client/products/paginator';


export default function DashboardLayoutPage() {
  return (
   
    <div className="z-index gap-4 grid ">


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


       {/**? 
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 h-[8rem] md:h-[12rem]">
        <CardProgressViews />
        <AreaChartComponent />
        <TopProductComponent />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 h-[25rem]">

      <Card isBlurred className="md:col-span-2 md:flex  border-none bg-background/50 dark:bg-sky-950/30">
          <CardBody>
            <Ordenes />
          </CardBody>
        </Card>

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
*/}
    </div>
  );
}
