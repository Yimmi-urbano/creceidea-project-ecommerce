import React from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { useTheme } from 'next-themes';

export default function CardProgressViews() {
  const { theme } = useTheme();  // Obtiene el tema actual

  const titleColor = theme === 'dark' ? 'text-black' : 'text-white';

  const circularProgressClasses = {
    svg: "w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] drop-shadow-md",
    indicator: theme === 'dark' ? "stroke-white" : "stroke-green-300",  // Verde claro en modo claro
    track: theme === 'dark' ? "stroke-white/10" : "stroke-green-100/10",  // Verde muy claro para la pista
    value: theme === 'dark' ? "text-1xl font-semibold text-white" : "text-1xl font-semibold text-green-600",  // Verde oscuro para el valor
  };

  return (
    <Card className="border-none" isBlurred>
      <CardBody className="justify-center items-center pb-0 flex flex-col">
        <div className={`text-xl font-bold ${titleColor} mb-2`}>
          Máximo 5000 visitas mensuales
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
          classNames={{
            base: theme === 'dark' ? "border-1 border-white/30" : "border-1 border-green-900",
            content: theme === 'dark' ? "text-white/90 text-small font-semibold" : "text-green-900 text-small font-semibold",
          }}
          variant="bordered"
        >
          2800 Visitas
        </Chip>
      </CardFooter>
    </Card>
  );
}
