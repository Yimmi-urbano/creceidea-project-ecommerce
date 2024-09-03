// ProductContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getProducts } from '@/hooks/fetchProducts';

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

interface ProductContextProps {
  products: Product[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  fetchProducts: () => void; // Nueva función agregada
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(page);
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <ProductContext.Provider value={{ products, page, totalPages, setPage, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
