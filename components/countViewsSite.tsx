import React from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { useTheme } from 'next-themes';

export default function CardProgressViews() {
  const { theme } = useTheme();  // Obtiene el tema actual


  const circularProgressClasses = {
    svg: "w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] drop-shadow-md",
    indicator: theme === 'dark' ? "stroke-white" : "stroke-green-300",  // Verde claro en modo claro
    track: theme === 'dark' ? "stroke-white/10" : "stroke-green-100/10",  // Verde muy claro para la pista
    value: theme === 'dark' ? "text-1xl font-semibold text-white" : "text-1xl font-semibold text-green-600",  // Verde oscuro para el valor
  };

  return (
    <Card isBlurred className="border-none bg-background/50 dark:bg-sky-800/40 max-w-[610px]">
      <CardBody className="justify-center items-center pb-0 flex flex-col">
        <div className={`text-sm mb-2 md:block hidden`}>
          Máximo <span className="font-bold"> 5000 </span> visitas mensuales
        </div>
        <CircularProgress
          classNames={circularProgressClasses}
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
