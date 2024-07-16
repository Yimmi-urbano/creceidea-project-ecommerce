import React from "react";
import {Link} from "@nextui-org/react";
import { siteConfig } from "@/config/site";

export default function Options() {
  return (
    <div className="block gap-2">
         {siteConfig.navItems.map((item) => (
      <Link isBlock size="md"  className="flex w-[90%] flex-wrap mb-3" href={item.href} color="foreground">
       {item.label}
      </Link>
      ))}
   
    </div>
  );
}
