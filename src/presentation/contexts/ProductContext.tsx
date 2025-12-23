/**
 * Product Context
 *
 * Provides product data and pagination state throughout the application.
 * Uses product services for data fetching.
 *
 * @module ProductContext
 */

'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { getProducts } from '@/src/application/products/productServices';
import { Product, ProductListResponse } from '@/src/domain/products/Product';

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
export const ProductProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState(1);
	const [totalProducts, setTotalProducts] = useState(0);
	const [isOrdering, setIsOrdering] = useState(false);
	const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchProductsData = async (): Promise<void> => {
		try {
			setIsLoading(true);
			const response = await getProducts({ page });

			// Assuming response structure - adjust based on actual API
			if (Array.isArray(response)) {
				setProducts(response);
				setTotalProducts(response.length);
				setTotalPages(Math.ceil(response.length / limit));
			} else if (response !== null && typeof response === 'object' && 'products' in response) {
				// If response has pagination data
				const paginatedResponse = response as ProductListResponse;
				setProducts(paginatedResponse.products);
				setTotalPages(
					paginatedResponse.totalPages !== undefined ? paginatedResponse.totalPages : 1
				);
				setLimit(paginatedResponse.page !== undefined ? 10 : 10); // Adjust according to interface
				setTotalProducts(paginatedResponse.total !== undefined ? paginatedResponse.total : 0);
			}
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		void fetchProductsData();
	}, [page]); // eslint-disable-line react-hooks/exhaustive-deps

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
export const useProductContext = (): ProductContextProps => {
	const context = useContext(ProductContext);
	if (context === undefined) {
		// More descriptive error for debugging
		if (typeof window !== 'undefined') {
			const hasDomain = localStorage.getItem('domainSelect');
			if (hasDomain === null || hasDomain === '') {
				throw new Error('Session expired: No domain found. Please log in again.');
			}
		}
		throw new Error('useProductContext must be used within a ProductProvider');
	}
	return context;
};
