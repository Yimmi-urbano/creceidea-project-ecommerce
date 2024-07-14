"use client"
import { title } from "@/components/primitives";
import CardProducts from "@/components/products/card";
import { Card, CardBody } from "@nextui-org/react";

export default function DashboardLayout() {
  return (
    <div className="z-index gap-4 grid ">
      <div className="grid grid-cols-4 gap-4 h-[15rem]">
        <Card isBlurred>
          <CardBody>

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

        <Card isBlurred >
          <CardBody>
          </CardBody>
        </Card>

      </div>
      <div className="grid grid-cols-3 gap-4 ">
        <Card isBlurred className="">
          <CardBody>
            <CardProducts />
          </CardBody>
        </Card>

        <Card isBlurred className="col-span-2">
          <CardBody>

          </CardBody>
        </Card>
      </div>


    </div>
  );
}
