"use client"
import { Card, CardBody } from "@nextui-org/react";
import OptionsToolbar  from "@/components/toolbar";
import Sidebar from "@/components/sidebar";
import { ThemeSwitch } from "@/components/theme-switch";

 export const HeadToolbar = () => {
  return (
   
    <div className="grid grid-cols-1 gap-4 h-[3rem]">
<Card isBlurred className="border-none bg-background/50 dark:bg-sky-950/30">
  <CardBody>
<ThemeSwitch/>
  </CardBody>
</Card>
</div>
  );
}
