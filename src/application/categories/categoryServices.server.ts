/**
 * Category Application Services - Server Side
 * 
 * Server-side business logic for categories.
 * 
 * @module categoryServices.server
 */

'use server'

import * as categoryRepo from '@/src/infrastructure/repositories/categoryRepository.server';
import { Category } from '@/src/domain/categories/Category';
import { revalidateTag } from 'next/cache';

/**
 * Get all categories (server-side)
 * 
 * @param revalidate - Cache time
 * @returns Promise with categories
 */
export async function getCategories(revalidate: number = 300): Promise<Category[]> {
    return categoryRepo.fetchCategories(revalidate);
}

/**
 * Create category (server action)
 * 
 * @param title - Category title
 * @param parent - Parent category ID
 * @returns Promise with created category
 */
export async function createCategory(
    title: string,
    parent?: string | null
): Promise<Category> {
    if (!title || title.trim().length === 0) {
        throw new Error('Category title is required');
    }

    const category = await categoryRepo.createCategory(title.trim(), parent);

    // Revalidate cache
    revalidateTag('categories');

    return category;
}

/**
 * Update category (server action)
 * 
 * @param id - Category ID
 * @param title - Updated title
 * @param parent - Updated parent
 * @returns Promise with updated category
 */
export async function updateCategory(
    id: string,
    title: string,
    parent?: string | null
): Promise<Category> {
    if (!title || title.trim().length === 0) {
        throw new Error('Category title is required');
    }

    if (id === parent) {
        throw new Error('Category cannot be its own parent');
    }

    const category = await categoryRepo.updateCategory(id, title.trim(), parent);

    // Revalidate cache
    revalidateTag('categories');

    return category;
}

/**
 * Delete category (server action)
 * 
 * @param id - Category ID
 * @returns Promise with result
 */
export async function deleteCategory(id: string): Promise<any> {
    const result = await categoryRepo.deleteCategory(id);

    // Revalidate cache
    revalidateTag('categories');

    return result;
}
