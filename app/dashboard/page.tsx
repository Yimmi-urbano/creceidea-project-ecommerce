"use client"
import AreaChartComponent from "@/components/areachart";
import CardProducts from "@/components/products/card";
import { Card, CardBody } from "@nextui-org/react";


export default function DashboardLayout() {
  return (
    <div className="z-index gap-4 grid ">
      <div className="grid grid-cols-1 gap-4 h-[3rem]">
        <Card isBlurred>
          <CardBody>

          </CardBody>
        </Card>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 h-[12rem]">
        <Card isBlurred>
          <CardBody>

          </CardBody>
        </Card>
        <Card isBlurred>
          <CardBody className="p-0">
            <AreaChartComponent />
          </CardBody>
        </Card>
        <Card isBlurred >
          <CardBody>

          </CardBody>
        </Card>

        <Card isBlurred >
          <CardBody>
          </CardBody>
        </Card>

      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card isBlurred className="">
          <CardBody>
            <CardProducts />
          </CardBody>
        </Card>

        <Card isBlurred className="md:col-span-2">
          <CardBody>

          </CardBody>
        </Card>
      </div>


    </div>
  );
}
