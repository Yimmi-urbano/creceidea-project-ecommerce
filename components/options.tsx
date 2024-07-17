import React from "react";
import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { DashboardIcon, CategoriesIcon, PagesIcon, ProductIcon, BlogIcon } from './icons';

type IconKey = "DashboardIcon" | "CategoriesIcon" | "PagesIcon" | "ProductIcon" | "BlogIcon";

const iconsMap: Record<IconKey, JSX.Element> = {
  DashboardIcon: <DashboardIcon size={30} />,  // Aumentar tamaño aquí
  CategoriesIcon: <CategoriesIcon size={30} />,
  PagesIcon: <PagesIcon size={30} />,
  ProductIcon: <ProductIcon size={30} />,
  BlogIcon: <BlogIcon size={30} />,
};

export default function Options() {
  return (
    <div className="flex flex-col items-center w-full">
      {siteConfig.navItems.map((item) => (
        <Link 
          isBlock 
          size="md" 
          className="flex items-center w-full mb-3 justify-start text-white"  // Cambia el color del texto aquí
          href={item.href}
        >
          {iconsMap[item.icon as IconKey]}
          <span className="ml-4"> 
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
