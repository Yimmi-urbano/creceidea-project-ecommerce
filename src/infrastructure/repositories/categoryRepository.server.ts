/**
 * Category Repository - Server Side
 * 
 * Server-side category data operations for Server Components and Server Actions.
 * Uses fetch API with Next.js cache configuration.
 * 
 * @module categoryRepository.server
 */

'use server'

import { serverGet, serverPost, serverPut, serverDelete } from '@/src/infrastructure/http/serverApiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { Category } from '@/src/domain/categories/Category';

const DEFAULT_ICON_URL = 'https://example.com/icons/placeholder.png';

/**
 * Fetch all categories (server-side)
 * 
 * @param revalidate - Cache revalidation time in seconds
 * @returns Promise with categories array
 */
export async function fetchCategories(revalidate: number = 300): Promise<Category[]> {
    try {
        return await serverGet<Category[]>(API_ENDPOINTS.CATEGORIES, {
            revalidate,
            tags: ['categories'],
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

/**
 * Create new category (server action)
 * 
 * @param title - Category title
 * @param parent - Parent category ID
 * @returns Promise with created category
 */
export async function createCategory(
    title: string,
    parent?: string | null
): Promise<Category> {
    return serverPost<Category>(API_ENDPOINTS.CATEGORIES, {
        title,
        icon_url: DEFAULT_ICON_URL,
        parent: parent || null,
    });
}

/**
 * Update existing category (server action)
 * 
 * @param id - Category ID
 * @param title - Updated title
 * @param parent - Updated parent category ID
 * @returns Promise with updated category
 */
export async function updateCategory(
    id: string,
    title: string,
    parent?: string | null
): Promise<Category> {
    if (id === parent) {
        throw new Error('No puede asignarse a sí mismo como categoría principal');
    }

    return serverPut<Category>(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
        title,
        icon_url: DEFAULT_ICON_URL,
        parent: parent || null,
    });
}

/**
 * Delete category (server action)
 * 
 * @param id - Category ID
 * @returns Promise with result
 */
export async function deleteCategory(id: string): Promise<any> {
    return serverDelete<any>(`${API_ENDPOINTS.CATEGORIES}/${id}`);
}
