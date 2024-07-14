"use client"
import React, { useEffect, useState } from "react";
import { Card, Link } from "@nextui-org/react";
import { getProducts } from "@/hooks/fetchProducts";

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

export default function CardProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        setProducts(response.products); // Acceder a la clave 'products' de la respuesta
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((item) => (
         <>
       <div className="pl-1 w-96 h-20 bg-sky-500/[.06] rounded-lg shadow-md">
      <div className="flex w-full h-full py-2 px-4 rounded-lg rounded-lg justify-between">
      <div className="my-auto">
        <img src={item.image_default} width={60} height={60}></img>
      </div>
        <div className="my-auto">
          <p className="font-bold">{item.title}</p>
          <p className="text-lg">S/ {item.price['regular']}</p>
        </div>
        <div className="my-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>                   
        </div>
      </div>
    </div>
         </>
      ))}
    </div>
  );
}
