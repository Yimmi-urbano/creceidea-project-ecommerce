import React, { useState, useEffect } from 'react';
import { Button, CardBody,Card } from '@nextui-org/react';
import { ProductIcon, EyeIcon } from './icons'; // Asegúrate que estos iconos están correctamente definidos
import withPermission from "./withPermission";

interface Product {
  name: string;
  image: string;
  sales: number;
  inStock: boolean;
}

// Datos de muestra del producto más vendido
const sampleProduct: Product = {
  name: "Audífonos Inalámbricos",
  image: "https://cdn.shopify.com/static/sample-images/garnished.jpeg?v=1571709138",
  sales: 120,
  inStock: true
};

const TopProductComponent: React.FC = () => {
  const [product, setProduct] = useState<Product>(sampleProduct);
  return (
    <Card isBlurred className="md:flex hidden border-none bg-[#53B48399] dark:bg-sky-950/30 max-w-[610px]">
          <CardBody >
            <div className="text-white flex flex-col items-center">
              <h2 className="text-sm font-bold mb-1 mt-1">Producto más vendido</h2>
              <div className="flex items-center justify-center w-full mb-5 mt-5">
                <img src={product.image} alt={product.name} className="w-20 h-21 rounded-xl" />
                <div className="flex flex-col ml-4">
                  <p className="text-sm">{product.sales} Ventas</p>
                  <div className="flex items-center mt-2">
                    <ProductIcon />
                    <span className="ml-1 text-sm">En stock</span>
                  </div>
                </div>
              </div>

              <Button type="submit" size="sm" variant='solid' endContent={<EyeIcon />} className="bg-white text-black m-auto block w-[80%] flex rounded-3xl" >
                Ver producto
              </Button>
            </div>
          </CardBody>
    </Card>
  );

};

export default withPermission(TopProductComponent, 'topproduct'); 
