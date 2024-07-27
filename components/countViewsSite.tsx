import React from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";


export default function CardProgressViews() {

  return (
    <Card isBlurred className="border-1 border-[#A2CADF] bg-[#E0EDF499] dark:bg-sky-950/30 dark:border-[#387EA3] max-w-[610px]">
      <CardBody className="justify-center items-center pb-0 flex flex-col">
      <div className="flex items-center mb-2">
        <WorldIcon className="w-6 h-6 text-blue-500 mr-2" />
        <span className="ml-4 font-bold text-[#25556D] dark:text-[#C1DCEA]">Máximo 2000 visitas al Mes</span>
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
