/**
 * Category Repository
 * 
 * Handles all category-related data operations.
 * Communicates with the categories API.
 * 
 * @module categoryRepository
 */

import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { Category } from '@/src/domain/categories/Category';

const DEFAULT_ICON_URL = 'https://example.com/icons/placeholder.png';

/**
 * Fetch all categories
 * 
 * @returns Promise with categories array
 */
export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await apiClient.get(API_ENDPOINTS.CATEGORIES);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

/**
 * Create new category
 * 
 * @param title - Category title
 * @param parent - Parent category ID (optional)
 * @returns Promise with created category
 */
export const createCategory = async (
    title: string,
    parent?: string | null
): Promise<Category> => {
    const response = await apiClient.post(API_ENDPOINTS.CATEGORIES, {
        title,
        icon_url: DEFAULT_ICON_URL,
        parent: parent || null,
    });
    return response.data;
};

/**
 * Update existing category
 * 
 * @param id - Category ID
 * @param title - Updated title
 * @param parent - Updated parent category ID (optional)
 * @returns Promise with updated category
 */
export const updateCategory = async (
    id: string,
    title: string,
    parent?: string | null
): Promise<Category> => {
    // Validation: category cannot be its own parent
    if (id === parent) {
        throw new Error('No puede asignarse a sí mismo como categoría principal');
    }

    const response = await apiClient.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
        title,
        icon_url: DEFAULT_ICON_URL,
        parent: parent || null,
    });
    return response.data;
};

/**
 * Delete category
 * 
 * @param id - Category ID
 * @returns Promise with deletion result
 */
export const deleteCategory = async (id: string): Promise<any> => {
    const response = await apiClient.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`);
    return response.data;
};
