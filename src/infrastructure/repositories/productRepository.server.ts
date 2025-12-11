/**
 * Product Repository - Server Side
 * 
 * Server-side product data operations for Server Components and Server Actions.
 * Uses fetch API with Next.js cache configuration.
 * 
 * @module productRepository.server
 */

'use server'

import { serverGet, serverPost, serverPatch, serverDelete } from '@/src/infrastructure/http/serverApiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { Product, ProductFilters } from '@/src/domain/products/Product';

/**
 * Fetch products with filters (server-side)
 * 
 * @param filters - Product filters
 * @param revalidate - Cache revalidation time in seconds
 * @returns Promise with products array
 */
export async function fetchProducts(
    filters: ProductFilters,
    revalidate: number = 60
): Promise<Product[]> {
    let url = API_ENDPOINTS.PRODUCTS;

    if (filters.title) {
        url += `/title/${filters.title}`;
    } else if (filters.category) {
        url += `/category/${filters.category}`;
    }

    url += `?page=${filters.page}`;

    return serverGet<Product[]>(url, {
        revalidate,
        tags: ['products'],
    });
}

/**
 * Get product by ID (server-side)
 * 
 * @param productId - Product ID
 * @param revalidate - Cache revalidation time
 * @returns Promise with product data
 */
export async function fetchProductById(
    productId: string,
    revalidate: number = 60
): Promise<Product> {
    return serverGet<Product>(`${API_ENDPOINTS.PRODUCTS}/${productId}`, {
        revalidate,
        tags: ['products', `product-${productId}`],
    });
}

/**
 * Create new product (server action)
 * 
 * @param productData - Product data
 * @returns Promise with created product
 */
export async function createProduct(productData: Partial<Product>): Promise<Product> {
    return serverPost<Product>(API_ENDPOINTS.PRODUCTS, productData);
}

/**
 * Update existing product (server action)
 * 
 * @param productId - Product ID
 * @param productData - Updated product data
 * @returns Promise with updated product
 */
export async function updateProduct(
    productId: string,
    productData: Partial<Product>
): Promise<Product> {
    return serverPatch<Product>(
        `${API_ENDPOINTS.PRODUCTS}/${productId}`,
        productData
    );
}

/**
 * Delete product (server action)
 * 
 * @param productId - Product ID
 * @returns Promise<void>
 */
export async function deleteProduct(productId: string): Promise<void> {
    await serverDelete<void>(`${API_ENDPOINTS.PRODUCTS}/${productId}/trash`);
}

/**
 * Update product order (server action)
 * 
 * @param orderData - Order data
 * @returns Promise with result
 */
export async function updateProductOrder(orderData: any): Promise<any> {
    return serverPatch<any>(`${API_ENDPOINTS.PRODUCTS}/sorter_custom`, orderData);
}
