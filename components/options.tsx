import React from "react";
import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import * as Icons from 'react-icons/md';

// Definir un tipo para el objeto Icons, asumiendo que cada clave retorna un componente React.
type IconType = {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const IconComponent: React.FC<{ iconName: string }> = ({ iconName }) => {
  const Icon = (Icons as IconType)[iconName];
  return Icon ? <Icon className="h-6 w-6 mr-3" /> : null;  // Ajustado el margen derecho a 12px
};

export default function Options() {
  return (
    <div className="flex flex-col items-center w-full mt-4">  
      {siteConfig.navItems.map((item) => (
        <Link 
          isBlock 
          size="md" 
          className="flex items-center w-11/12 mb-4 justify-start text-white"  // Margen inferior aumentado a 16px
          href={item.href} 
          color="foreground"
        >
          <IconComponent iconName={item.icon} />
          {item.label}
        </Link>
      ))}
    </div>
  );
}

