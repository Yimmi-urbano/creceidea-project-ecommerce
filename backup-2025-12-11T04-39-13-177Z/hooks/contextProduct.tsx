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
  order: number;
}

interface ProductContextProps {
  products: Product[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  fetchProducts: () => void;
  limit: number;
  totalProducts: number;
  setIsOrdering: (status: boolean) => void;
  isOrdering: boolean;
  setOrderedProducts: (items: any) => void;
  orderedProducts: any;

}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(page);
      setProducts(response.products);
      setTotalPages(response.totalPages);
      setLimit(response.limit);
      setTotalProducts(response.totalProducts)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <ProductContext.Provider value={{ products, page, totalPages, setPage, fetchProducts, limit, totalProducts, setIsOrdering, isOrdering, setOrderedProducts, orderedProducts}}>
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
