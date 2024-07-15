import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { getProducts } from "@/hooks/fetchProducts";
import withPermission from "../withPermission"; 

interface Product {
  price: {
    regular: number;
    sale: number;
    tag: string;
  };
  _id: string;
  title: string;
  image_default: string;
  stock: number;
  is_available: boolean;
  description_short: string;
}

const CardProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        setProducts(response.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((item) => (
        <Card key={item._id} className="w-96 bg-sky-500/[.06] rounded-lg shadow-md">
          <div className="flex items-center gap-4 p-4">
            <img src={item.image_default} alt={item.title} width={60} height={60} />
            <div>
              <p className="font-bold text-xs">{item.title}</p>
              <p className="text-xs">S/ {item.price.regular}</p>
            </div>
            <div>
          
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default withPermission(CardProducts, 'inventario'); // Proteger el componente usando el HOC
