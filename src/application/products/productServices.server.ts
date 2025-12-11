/**
 * Product Application Services - Server Side
 * 
 * Server-side business logic for products.
 * Used in Server Components and Server Actions.
 * 
 * @module productServices.server
 */

'use server'

import * as productRepo from '@/src/infrastructure/repositories/productRepository.server';
import { Product, ProductFilters } from '@/src/domain/products/Product';
import { revalidateTag } from 'next/cache';

/**
 * Get products with filters (server-side)
 * 
 * @param filters - Product filters
 * @param revalidate - Cache time
 * @returns Promise with products
 */
export async function getProducts(
    filters: ProductFilters,
    revalidate: number = 60
): Promise<Product[]> {
    return productRepo.fetchProducts(filters, revalidate);
}

/**
 * Get product by ID (server-side)
 * 
 * @param productId - Product ID
 * @param revalidate - Cache time
 * @returns Promise with product
 */
export async function getProductById(
    productId: string,
    revalidate: number = 60
): Promise<Product> {
    return productRepo.fetchProductById(productId, revalidate);
}

/**
 * Create product (server action)
 * 
 * @param productData - Product data
 * @returns Promise with created product
 */
export async function createProduct(productData: Partial<Product>): Promise<Product> {
    // Validation
    if (!productData.title || !productData.price) {
        throw new Error('Title and price are required');
    }

    if (productData.stock && Number(productData.stock) < 0) {
        throw new Error('Stock cannot be negative');
    }

    const product = await productRepo.createProduct(productData);

    // Revalidate cache
    revalidateTag('products');

    return product;
}

/**
 * Update product (server action)
 * 
 * @param productId - Product ID
 * @param productData - Updated data
 * @returns Promise with updated product
 */
export async function updateProduct(
    productId: string,
    productData: Partial<Product>
): Promise<Product> {
    // Validation
    if (productData.stock && Number(productData.stock) < 0) {
        throw new Error('Stock cannot be negative');
    }

    const product = await productRepo.updateProduct(productId, productData);

    // Revalidate cache
    revalidateTag('products');
    revalidateTag(`product-${productId}`);

    return product;
}

/**
 * Delete product (server action)
 * 
 * @param productId - Product ID
 * @returns Promise<void>
 */
export async function deleteProduct(productId: string): Promise<void> {
    await productRepo.deleteProduct(productId);

    // Revalidate cache
    revalidateTag('products');
    revalidateTag(`product-${productId}`);
}

/**
 * Update product order (server action)
 * 
 * @param orderData - Order data
 * @returns Promise with result
 */
export async function updateProductOrder(orderData: any): Promise<any> {
    const result = await productRepo.updateProductOrder(orderData);

    // Revalidate cache
    revalidateTag('products');

    return result;
}
