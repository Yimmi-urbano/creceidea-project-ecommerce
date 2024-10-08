import React, { useEffect, useState } from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { WorldIcon } from "./icons";

interface ApiResponse {
  views: number;
  limit_views: number;
}

// Simulación de una llamada API
const fetchApiData = (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ views: 1000, limit_views: 2800 });
    }, 500); // Simula una latencia de 500ms
  });
};

export default function CardProgressViews() {
  const [data, setData] = useState<ApiResponse>({ views: 0, limit_views: 0 });

  useEffect(() => {
    fetchApiData().then(response => {
      setData(response);
    });
  }, []);

  const { views, limit_views } = data;
  const value = (views / limit_views) * 100;

  return (
    <Card isBlurred className="border-1 border-[#A2CADF] bg-[#E0EDF499] dark:bg-sky-950/30 dark:border-[#387EA3] max-w-[610px]">
      <CardBody className="justify-center items-center p-0 flex flex-col">
        <div className="flex items-center gap-2">
          <WorldIcon className="w-2 h-2 text-blue-500" />
          <span className="font-bold text-[#25556D] text-xs dark:text-[#C1DCEA]">{limit_views} vistas por mes</span>
        </div>
        <CircularProgress
          size="lg"
          classNames={{
            svg: "md:w-28 md:h-28 drop-shadow-md",
            value: "md:text-2xl font-semibold text-white",
          }}
          value={value||0}
          strokeWidth={3}
          color="success"
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          size="sm"
          variant="bordered"
          className="border-1 border-[#A2CADF] text-[#C1DCEA]"
        >
          {limit_views} Visitas
        </Chip>
      </CardFooter>
    </Card>
  );
}
