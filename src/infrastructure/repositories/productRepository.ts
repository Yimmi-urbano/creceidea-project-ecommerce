/**
 * Product Repository
 * 
 * Handles all product-related data operations.
 * Communicates with the products API.
 * 
 * @module productRepository
 */

import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { Product, ProductFilters } from '@/src/domain/products/Product';

/**
 * Fetch products with filters
 * 
 * @param filters - Product filters (page, title, category)
 * @returns Promise with products array
 */
export const fetchProducts = async (filters: ProductFilters): Promise<Product[]> => {
    let url = API_ENDPOINTS.PRODUCTS;

    if (filters.title) {
        url += `/title/${filters.title}`;
    } else if (filters.category) {
        url += `/category/${filters.category}`;
    }

    const response = await apiClient.get(url, {
        params: { page: filters.page },
    });

    return response.data;
};

/**
 * Get product by ID
 * 
 * @param productId - Product ID
 * @returns Promise with product data
 */
export const fetchProductById = async (productId: string): Promise<Product> => {
    const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
    return response.data;
};

/**
 * Create new product
 * 
 * @param productData - Product data
 * @returns Promise with created product
 */
export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
    const response = await apiClient.post(API_ENDPOINTS.PRODUCTS, productData);
    return response.data;
};

/**
 * Update existing product
 * 
 * @param productId - Product ID
 * @param productData - Updated product data
 * @returns Promise with updated product
 */
export const updateProduct = async (
    productId: string,
    productData: Partial<Product>
): Promise<Product> => {
    const response = await apiClient.patch(
        `${API_ENDPOINTS.PRODUCTS}/${productId}`,
        productData
    );
    return response.data;
};

/**
 * Delete product (soft delete - move to trash)
 * 
 * @param productId - Product ID
 * @returns Promise<void>
 */
export const deleteProduct = async (productId: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${productId}/trash`);
};

/**
 * Update product order/sorting
 * 
 * @param orderData - Array of product IDs in new order
 * @returns Promise with updated data
 */
export const updateProductOrder = async (orderData: any): Promise<any> => {
    const response = await apiClient.patch(
        `${API_ENDPOINTS.PRODUCTS}/sorter_custom`,
        orderData
    );
    return response.data;
};
