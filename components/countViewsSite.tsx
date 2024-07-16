import React from "react";
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";

export default function CardProgressViews() {
  return (
    <Card className="border-none" isBlurred>
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-[5rem] h-[5rem] md:w-[7rem] md:h-[7rem] drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-1xl font-semibold text-white",
          }}
          value={70}
          strokeWidth={3}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          2800 Visitas
        </Chip>
      </CardFooter>
    </Card>
  );
}
