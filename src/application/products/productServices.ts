/**
 * Product Application Services
 * 
 * Business logic layer for product operations.
 * Orchestrates repository calls and implements use cases.
 * 
 * @module productServices
 */

import * as productRepo from '@/src/infrastructure/repositories/productRepository';
import { Product, ProductFilters, ProductFormData } from '@/src/domain/products/Product';

/**
 * Get products with filters
 * 
 * @param filters - Product filters
 * @returns Promise with products array
 */
export const getProducts = async (filters: ProductFilters): Promise<Product[]> => {
    return productRepo.fetchProducts(filters);
};

/**
 * Get product by ID
 * 
 * @param productId - Product ID
 * @returns Promise with product
 */
export const getProductById = async (productId: string): Promise<Product> => {
    return productRepo.fetchProductById(productId);
};

/**
 * Create new product
 * Validates data and creates product
 * 
 * @param productData - Product data
 * @returns Promise with created product
 */
export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
    // Business logic: validate required fields
    if (!productData.title || !productData.price) {
        throw new Error('Title and price are required');
    }

    // Business logic: ensure stock is not negative
    if (productData.stock && Number(productData.stock) < 0) {
        throw new Error('Stock cannot be negative');
    }

    return productRepo.createProduct(productData);
};

/**
 * Update existing product
 * Validates data and updates product
 * 
 * @param productId - Product ID
 * @param productData - Updated data
 * @returns Promise with updated product
 */
export const updateProduct = async (
    productId: string,
    productData: Partial<Product>
): Promise<Product> => {
    // Business logic: validate stock
    if (productData.stock && Number(productData.stock) < 0) {
        throw new Error('Stock cannot be negative');
    }

    return productRepo.updateProduct(productId, productData);
};

/**
 * Delete product (move to trash)
 * 
 * @param productId - Product ID
 * @returns Promise<void>
 */
export const deleteProduct = async (productId: string): Promise<void> => {
    return productRepo.deleteProduct(productId);
};

/**
 * Update product display order
 * 
 * @param orderData - Order data
 * @returns Promise with result
 */
export const updateProductOrder = async (orderData: any): Promise<any> => {
    return productRepo.updateProductOrder(orderData);
};

/**
 * Search products by title
 * Convenience method for title search
 * 
 * @param title - Search term
 * @param page - Page number
 * @returns Promise with products
 */
export const searchProducts = async (title: string, page: number = 1): Promise<Product[]> => {
    return productRepo.fetchProducts({ page, title });
};

/**
 * Get products by category
 * Convenience method for category filter
 * 
 * @param category - Category slug
 * @param page - Page number
 * @returns Promise with products
 */
export const getProductsByCategory = async (
    category: string,
    page: number = 1
): Promise<Product[]> => {
    return productRepo.fetchProducts({ page, category });
};

/**
 * Fetch all categories
 * 
 * @returns Promise with categories array
 */
export const fetchCategories = async (): Promise<any[]> => {
    return productRepo.fetchCategories();
};
