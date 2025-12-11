/**
 * Product Context
 * 
 * Provides product data and pagination state throughout the application.
 * Uses product services for data fetching.
 * 
 * @module ProductContext
 */

'use client'

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getProducts } from '@/src/application/products/productServices';
import { Product } from '@/src/domain/products/Product';

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
    setOrderedProducts: (items: Product[]) => void;
    orderedProducts: Product[];
    isLoading: boolean;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

/**
 * Product Provider Component
 * Manages product list state and pagination
 */
export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProductsData = async () => {
        try {
            setIsLoading(true);
            const response = await getProducts({ page });

            // Assuming response structure - adjust based on actual API
            if (Array.isArray(response)) {
                setProducts(response);
                setTotalProducts(response.length);
                setTotalPages(Math.ceil(response.length / limit));
            } else if (response && 'products' in response) {
                // If response has pagination data
                setProducts((response as any).products);
                setTotalPages((response as any).totalPages || 1);
                setLimit((response as any).limit || 10);
                setTotalProducts((response as any).totalProducts || 0);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductsData();
    }, [page]);

    return (
        <ProductContext.Provider
            value={{
                products,
                page,
                totalPages,
                setPage,
                fetchProducts: fetchProductsData,
                limit,
                totalProducts,
                setIsOrdering,
                isOrdering,
                setOrderedProducts,
                orderedProducts,
                isLoading,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

/**
 * Hook to access product context
 * 
 * @returns Product context
 * @throws Error if used outside ProductProvider
 */
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
