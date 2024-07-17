import React, { useState, useEffect } from 'react';
import { Button, CardBody } from '@nextui-org/react';
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
  // En lugar de fetch, usar el producto de muestra
  const [product, setProduct] = useState<Product>(sampleProduct);

  // No es necesario cargar datos dinámicamente en este componente por ahora
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Si necesitas cargar datos en el futuro, puedes descomentar y ajustar esta función
  // const fetchData = async () => {
  //   try {
  //     const response = await getProducts();
  //     setProduct(response.products[0]); // Asumiendo que quieres mostrar el primer producto
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  return (
    <div className="text-white flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6 mt-6">Producto más vendido</h2>
      <div className="flex items-center justify-center w-full mb-10 mt-6">
        <img src={product.image} alt={product.name} className="w-20 h-21" />
        <div className="flex flex-col ml-4">
          <p className="text-lg">{product.sales} Ventas</p>
          <div className="flex items-center mt-2">
            <ProductIcon /> {/* Icono de producto en stock */}
            <span className="ml-1">En stock</span>
          </div>
        </div>
      </div>
      <button className="w-full bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full flex items-center justify-center">
        <span>Ver producto</span>
        <EyeIcon className="ml-2" /> {/* Asegúrate de que EyeIcon esté correctamente importado */}
      </button>
    </div>
  );
  
};

export default withPermission(TopProductComponent, 'topproduct'); 
