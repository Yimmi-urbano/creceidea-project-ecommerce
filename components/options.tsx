import React from "react";
import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { DashboardIcon, CategoriesIcon, PagesIcon, ProductIcon, BlogIcon } from './icons';

type IconKey = "DashboardIcon" | "CategoriesIcon" | "PagesIcon" | "ProductIcon" | "BlogIcon";

const iconsMap: Record<IconKey, JSX.Element> = {
  DashboardIcon: <DashboardIcon size={20} />,  // Aumentar tamaño aquí
  CategoriesIcon: <CategoriesIcon size={20} />,
  PagesIcon: <PagesIcon size={20} />,
  ProductIcon: <ProductIcon size={20} />,
  BlogIcon: <BlogIcon size={20} />,
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
