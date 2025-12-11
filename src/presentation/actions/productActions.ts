/**
 * Product Server Actions
 * 
 * Next.js Server Actions for product operations.
 * Can be called directly from Client Components and forms.
 * 
 * @module productActions
 */

'use server'

import { revalidatePath } from 'next/cache';
import * as productServices from '@/src/application/products/productServices.server';
import { Product } from '@/src/domain/products/Product';

/**
 * Create new product action
 * 
 * @param formData - Form data or product object
 * @returns Created product
 */
export async function createProductAction(formData: FormData | Partial<Product>) {
    try {
        let productData: Partial<Product>;

        if (formData instanceof FormData) {
            // Parse FormData
            productData = {
                title: formData.get('title') as string,
                price: {
                    regular: Number(formData.get('price')),
                    sale: Number(formData.get('sale')),
                    tag: formData.get('priceTag') as string || '',
                },
                stock: formData.get('stock') as string,
                description_short: formData.get('description_short') as string,
                description_long: formData.get('description_long') as string,
                is_available: formData.get('is_available') === 'true',
            };
        } else {
            productData = formData;
        }

        const product = await productServices.createProduct(productData);

        // Revalidate product pages
        revalidatePath('/dashboard/products');
        revalidatePath('/products');

        return { success: true, data: product };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error creating product',
        };
    }
}

/**
 * Update product action
 * 
 * @param productId - Product ID
 * @param formData - Form data or product object
 * @returns Updated product
 */
export async function updateProductAction(
    productId: string,
    formData: FormData | Partial<Product>
) {
    try {
        let productData: Partial<Product>;

        if (formData instanceof FormData) {
            productData = {
                title: formData.get('title') as string,
                price: {
                    regular: Number(formData.get('price')),
                    sale: Number(formData.get('sale')),
                    tag: formData.get('priceTag') as string || '',
                },
                stock: formData.get('stock') as string,
                description_short: formData.get('description_short') as string,
                description_long: formData.get('description_long') as string,
                is_available: formData.get('is_available') === 'true',
            };
        } else {
            productData = formData;
        }

        const product = await productServices.updateProduct(productId, productData);

        // Revalidate product pages
        revalidatePath('/dashboard/products');
        revalidatePath(`/products/${productId}`);
        revalidatePath('/products');

        return { success: true, data: product };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error updating product',
        };
    }
}

/**
 * Delete product action
 * 
 * @param productId - Product ID
 * @returns Success status
 */
export async function deleteProductAction(productId: string) {
    try {
        await productServices.deleteProduct(productId);

        // Revalidate product pages
        revalidatePath('/dashboard/products');
        revalidatePath('/products');

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error deleting product',
        };
    }
}

/**
 * Update product order action
 * 
 * @param orderData - Order data
 * @returns Success status
 */
export async function updateProductOrderAction(orderData: any) {
    try {
        await productServices.updateProductOrder(orderData);

        // Revalidate product pages
        revalidatePath('/dashboard/products');
        revalidatePath('/products');

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error updating order',
        };
    }
}
