/**
 * Categories Hook
 * 
 * Custom hook for category operations.
 * Uses category services for data fetching and mutations.
 * 
 * @module useCategories
 */

'use client'

import { useState, useEffect } from 'react';
import * as categoryServices from '@/src/application/categories/categoryServices';
import { Category } from '@/src/domain/categories/Category';

/**
 * Hook for managing categories
 * 
 * @returns Category data and operations
 */
export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryTree, setCategoryTree] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch all categories
     */
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await categoryServices.getCategories();
            setCategories(data);

            // Build tree structure
            const tree = categoryServices.buildCategoryTree(data);
            setCategoryTree(tree);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching categories');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create new category
     */
    const createCategory = async (title: string, parent?: string | null) => {
        setLoading(true);
        setError(null);

        try {
            await categoryServices.createCategory(title, parent);
            await fetchCategories(); // Refresh list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creating category';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update existing category
     */
    const updateCategory = async (id: string, title: string, parent?: string | null) => {
        setLoading(true);
        setError(null);

        try {
            await categoryServices.updateCategory(id, title, parent);
            await fetchCategories(); // Refresh list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error updating category';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete category
     */
    const deleteCategory = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            await categoryServices.deleteCategory(id);
            await fetchCategories(); // Refresh list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error deleting category';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        categoryTree,
        loading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
        refresh: fetchCategories,
    };
};
