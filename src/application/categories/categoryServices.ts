/**
 * Category Application Services
 * 
 * Business logic layer for category operations.
 * Handles category hierarchy and validation.
 * 
 * @module categoryServices
 */

import * as categoryRepo from '@/src/infrastructure/repositories/categoryRepository';
import { Category } from '@/src/domain/categories/Category';

/**
 * Get all categories
 * 
 * @returns Promise with categories array
 */
export const getCategories = async (): Promise<Category[]> => {
    return categoryRepo.fetchCategories();
};

/**
 * Create new category
 * Validates title and creates category
 * 
 * @param title - Category title
 * @param parent - Parent category ID
 * @returns Promise with created category
 */
export const createCategory = async (
    title: string,
    parent?: string | null
): Promise<Category> => {
    // Business logic: validate title
    if (!title || title.trim().length === 0) {
        throw new Error('Category title is required');
    }

    return categoryRepo.createCategory(title.trim(), parent);
};

/**
 * Update category
 * Validates data and prevents circular references
 * 
 * @param id - Category ID
 * @param title - Updated title
 * @param parent - Updated parent ID
 * @returns Promise with updated category
 */
export const updateCategory = async (
    id: string,
    title: string,
    parent?: string | null
): Promise<Category> => {
    // Business logic: validate title
    if (!title || title.trim().length === 0) {
        throw new Error('Category title is required');
    }

    // Business logic: prevent self-reference
    if (id === parent) {
        throw new Error('Category cannot be its own parent');
    }

    return categoryRepo.updateCategory(id, title.trim(), parent);
};

/**
 * Delete category
 * 
 * @param id - Category ID
 * @returns Promise with result
 */
export const deleteCategory = async (id: string): Promise<any> => {
    return categoryRepo.deleteCategory(id);
};

/**
 * Build category tree
 * Organizes flat category list into hierarchical tree
 * 
 * @param categories - Flat categories array
 * @returns Hierarchical category tree
 */
export const buildCategoryTree = (categories: Category[]): Category[] => {
    const categoryMap = new Map<string, Category & { children: Category[] }>();
    const rootCategories: Category[] = [];

    // Create map and initialize children
    categories.forEach(cat => {
        categoryMap.set(cat._id, { ...cat, children: [] });
    });

    // Build tree
    categories.forEach(cat => {
        const category = categoryMap.get(cat._id)!;

        if (cat.parent && categoryMap.has(cat.parent)) {
            // Add to parent's children
            const parent = categoryMap.get(cat.parent)!;
            parent.children.push(category);
        } else {
            // Root category
            rootCategories.push(category);
        }
    });

    return rootCategories;
};
