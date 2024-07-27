import React from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";

export default function CardProgressViews() {

  return (
    <Card isBlurred className="border-none bg-background/50 dark:bg-sky-950/30 max-w-[610px]">
      <CardBody className="justify-center items-center pb-0 flex flex-col">
        <div className={`text-sm mb-2 md:block hidden`}>
          Máximo <span className="font-bold"> 5000 </span> visitas mensuales
        </div>
        <CircularProgress
        
          value={70}
          strokeWidth={3}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
      
          variant="bordered"
        >
          2800 Visitas
        </Chip>
      </CardFooter>
    </Card>
  );
}
