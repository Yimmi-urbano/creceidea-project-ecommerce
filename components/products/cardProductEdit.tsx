import React from 'react';
import { Card, Button } from "@nextui-org/react";
import { MiniEyeIcon, MiniTrashIcon, ShareIcon } from '../icons';
import { useProductContext } from '@/hooks/contextProduct';
import withPermission from "../withPermission";

const CardProducts: React.FC = () => {
  const { products } = useProductContext();
 
  return (
   
    <div className="flex flex-wrap gap-3">
      {products.map((item) => (
        <Card key={item._id} className="w-full rounded-lg flex flex-row border-none bg-background/70 dark:bg-sky-950/30">
          <div className="flex items-center gap-4 p-2 flex-grow">
            <img src={item.image_default[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <h3 className="font-bold text-sm">{item.title}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-sm line-through text-red-500 dark:text-red-300">S/ {item.price.regular.toFixed(2)}</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-300">S/ {item.price.sale.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row  justify-center items-center gap-3 pr-3">
            <Button isIconOnly color="success" variant="flat" className="p-0 min-w-6 w-6 h-6 rounded-md" aria-label="Ver Detalles">
              <MiniEyeIcon size={18} />
            </Button>
            <Button isIconOnly color="danger" variant="flat" className="p-0 min-w-6 w-6 h-6 rounded-md" aria-label="Eliminar">
              <MiniTrashIcon size={18} />
            </Button>
           
          
          </div>
        </Card>
      ))}
    </div>
  );
};

export default withPermission(CardProducts, 'inventario');
