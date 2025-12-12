import React from "react";
import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { DashboardIcon, CategoriesIcon, PagesIcon, ProductIcon, PaymentIcon, OrderIcon } from "@/src/presentation/components/shared/Icons";

type IconKey = "DashboardIcon" | "CategoriesIcon" | "PagesIcon" | "ProductIcon" | "PaymentIcon" | "OrderIcon";

const iconsMap: Record<IconKey, JSX.Element> = {
  DashboardIcon: <DashboardIcon size={20} />,  
  CategoriesIcon: <CategoriesIcon size={20} />,
  PagesIcon: <PagesIcon size={20} />,
  ProductIcon: <ProductIcon size={20} />,
  OrderIcon: <OrderIcon size={20} />,
  PaymentIcon: <PaymentIcon size={20} />,
};

export default function Options() {
  return (
    <div className="flex flex-col items-center w-full">
      {siteConfig.navItems.map((item) => (
        <Link 
        key={item.href}
          isBlock 
          size="md" 
          className="flex items-center w-full mb-3 justify-start text-white"  
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
