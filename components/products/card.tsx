// CardProducts.tsx
import React from 'react';
import { Card, Button } from "@nextui-org/react";
import { MiniEyeIcon, MiniTrashIcon } from '../icons';
import { useProductContext } from '@/hooks/contextProduct';
import withPermission from "../withPermission";

const CardProducts: React.FC = () => {
  const { filteredProducts } = useProductContext();

  return (
    <div className="flex flex-wrap gap-4">
      <h2 className="text-xl font-semibold text-gray-600 dark:text-white mb-4">Productos</h2>
      {filteredProducts.map((item) => (
        <Card key={item._id} className="w-full rounded-lg flex flex-row border-none bg-background/70 dark:bg-sky-950/30">
          <div className="flex items-center gap-4 p-4 flex-grow">
            <img src={item.image_default[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <h3 className="font-bold text-sm">{item.title}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-sm line-through text-red-500 dark:text-red-300">S/ {item.price.regular.toFixed(2)}</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-300">S/ {item.price.sale.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 pr-0">
            <Button isIconOnly color="success" variant="flat" className="p-0 min-w-7 w-7 h-7 rounded-md" aria-label="Ver Detalles">
              <MiniEyeIcon size={20} />
            </Button>
            <Button isIconOnly color="danger" variant="flat" className="p-0 min-w-7 w-7 h-7 rounded-md" aria-label="Eliminar">
              <MiniTrashIcon size={20} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default withPermission(CardProducts, 'inventario');
