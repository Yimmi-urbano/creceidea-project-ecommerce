/**
 * Category Server Actions
 * 
 * Next.js Server Actions for category operations.
 * 
 * @module categoryActions
 */

'use server'

import { revalidatePath } from 'next/cache';
import * as categoryServices from '@/src/application/categories/categoryServices.server';

/**
 * Create category action
 * 
 * @param title - Category title
 * @param parent - Parent category ID (optional)
 * @returns Created category
 */
export async function createCategoryAction(title: string, parent?: string | null) {
    try {
        const category = await categoryServices.createCategory(title, parent);

        // Revalidate category pages
        revalidatePath('/dashboard/categories');
        revalidatePath('/products');

        return { success: true, data: category };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error creating category',
        };
    }
}

/**
 * Update category action
 * 
 * @param id - Category ID
 * @param title - Updated title
 * @param parent - Updated parent ID (optional)
 * @returns Updated category
 */
export async function updateCategoryAction(
    id: string,
    title: string,
    parent?: string | null
) {
    try {
        const category = await categoryServices.updateCategory(id, title, parent);

        // Revalidate category pages
        revalidatePath('/dashboard/categories');
        revalidatePath('/products');

        return { success: true, data: category };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error updating category',
        };
    }
}

/**
 * Delete category action
 * 
 * @param id - Category ID
 * @returns Success status
 */
export async function deleteCategoryAction(id: string) {
    try {
        await categoryServices.deleteCategory(id);

        // Revalidate category pages
        revalidatePath('/dashboard/categories');
        revalidatePath('/products');

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error deleting category',
        };
    }
}
