/**
 * Products Hook
 * 
 * Custom hook for product operations.
 * Uses product services for data fetching and mutations.
 * 
 * @module useProducts
 */

'use client'

import { useState, useEffect } from 'react';
import * as productServices from '@/src/application/products/productServices';
import { Product, ProductFilters } from '@/src/domain/products/Product';

/**
 * Hook for managing products
 * 
 * @param initialFilters - Initial filter state
 * @returns Product data and operations
 */
export const useProducts = (initialFilters: ProductFilters = { page: 1 }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ProductFilters>(initialFilters);

    /**
     * Fetch products with current filters
     */
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await productServices.getProducts(filters);
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Search products by title
     */
    const searchProducts = async (title: string) => {
        setFilters({ ...filters, title, page: 1 });
    };

    /**
     * Filter by category
     */
    const filterByCategory = async (category: string) => {
        setFilters({ ...filters, category, page: 1 });
    };

    /**
     * Change page
     */
    const changePage = (page: number) => {
        setFilters({ ...filters, page });
    };

    /**
     * Refresh products
     */
    const refresh = () => {
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    return {
        products,
        loading,
        error,
        filters,
        searchProducts,
        filterByCategory,
        changePage,
        refresh,
    };
};

/**
 * Hook for single product
 * 
 * @param productId - Product ID
 * @returns Product data and loading state
 */
export const useProduct = (productId: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await productServices.getProductById(productId);
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    return { product, loading, error };
};

/**
 * Hook for product mutations
 * 
 * @returns Product mutation functions
 */
export const useProductMutations = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Create new product
     */
    const createProduct = async (productData: Partial<Product>) => {
        setLoading(true);
        setError(null);

        try {
            const product = await productServices.createProduct(productData);
            return product;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creating product';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update existing product
     */
    const updateProduct = async (productId: string, productData: Partial<Product>) => {
        setLoading(true);
        setError(null);

        try {
            const product = await productServices.updateProduct(productId, productData);
            return product;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error updating product';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete product
     */
    const deleteProduct = async (productId: string) => {
        setLoading(true);
        setError(null);

        try {
            await productServices.deleteProduct(productId);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error deleting product';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        loading,
        error,
    };
};
