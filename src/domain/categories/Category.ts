/**
 * Category Domain Entity
 * 
 * Represents a product category in the e-commerce system.
 * Supports hierarchical categories with parent-child relationships.
 * 
 * @module Category
 */

/**
 * Category entity
 */
export interface Category {
    /** Unique category identifier */
    _id: string;
    /** Category title/name */
    title: string;
    /** Category icon URL */
    icon_url: string;
    /** Parent category ID (null for root categories) */
    parent: string | null;
    /** Category slug for URLs */
    slug?: string;
    /** Child categories */
    children?: Category[];
    /** Created date */
    createdAt?: string;
    /** Updated date */
    updatedAt?: string;
}

/**
 * Category tree node (for hierarchical display)
 */
export interface CategoryTreeNode extends Category {
    /** Nesting level (0 for root) */
    level: number;
    /** Whether category has children */
    hasChildren: boolean;
    /** Child categories */
    children: CategoryTreeNode[];
}

/**
 * Category form data (for create/update)
 */
export interface CategoryFormData {
    /** Category title */
    title: string;
    /** Icon URL */
    icon_url?: string;
    /** Parent category ID */
    parent?: string | null;
}

/**
 * Category with product count
 */
export interface CategoryWithCount extends Category {
    /** Number of products in this category */
    productCount: number;
}
