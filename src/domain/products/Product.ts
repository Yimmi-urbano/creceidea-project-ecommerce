/**
 * Product Domain Entity
 * 
 * Represents a product in the e-commerce system.
 * Contains all product-related data including pricing, images, variations, and metadata.
 * 
 * @module Product
 */

/**
 * Product price information
 */
export interface ProductPrice {
    /** Regular price before discount */
    regular: number;
    /** Sale price (discounted) */
    sale: number;
    /** Optional price tag/label (e.g., "x 3 meses") */
    tag?: string;
}

/**
 * Product category reference
 */
export interface ProductCategory {
    /** Category ID */
    idcat: string;
    /** Category slug for URLs */
    slug: string;
}

/**
 * Product attribute value
 */
export interface AttributeValue {
    /** Attribute value ID */
    Id: string;
    /** Attribute value (e.g., "S", "M", "L") */
    valor: string;
}

/**
 * Product attribute (e.g., Size, Color)
 */
export interface ProductAttribute {
    /** Attribute name (e.g., "Talla", "Color") */
    name_attr: string;
    /** Possible values for this attribute */
    values: AttributeValue[];
}

/**
 * Product variation (combination of attributes)
 */
export interface ProductVariation {
    /** Child attribute IDs that define this variation */
    chill_attr: string[];
    /** Price for this specific variation */
    price: ProductPrice;
}

/**
 * Trash status for soft delete
 */
export interface TrashStatus {
    /** Date when product was trashed */
    date: string;
    /** Whether product is in trash */
    status: boolean;
}

/**
 * Complete Product entity
 */
export interface Product {
    /** Unique product identifier */
    _id: string;
    /** Product ID (alternative identifier) */
    id?: string;
    /** Product title/name */
    title: string;
    /** Product type (e.g., "basic", "variable") */
    type_product: string;
    /** Default product images */
    image_default: string[];
    /** Product categories */
    category: ProductCategory[];
    /** Stock quantity */
    stock: string | number;
    /** Whether product is available for purchase */
    is_available: boolean;
    /** Product pricing */
    price: ProductPrice;
    /** Trash/soft delete status */
    is_trash: TrashStatus;
    /** Default variation attribute IDs */
    default_variations?: string[];
    /** Product attributes (size, color, etc.) */
    atributos?: ProductAttribute[];
    /** Product variations */
    variations?: ProductVariation[];
    /** Long description (HTML) */
    description_long?: string;
    /** Short description */
    description_short?: string;
    /** Integrations */
    integrations?: any[];
    /** Created date */
    createdAt?: string;
    /** Updated date */
    updatedAt?: string;
}

/**
 * Product filters for search/listing
 */
export interface ProductFilters {
    /** Page number for pagination */
    page: number;
    /** Filter by title (search) */
    title?: string;
    /** Filter by category */
    category?: string;
    /** Filter by availability */
    is_available?: boolean;
    /** Filter by trash status */
    is_trash?: boolean;
}

/**
 * Product form data (for create/update)
 */
export interface ProductFormData {
    /** Product name */
    name: string;
    /** Short description */
    description_corta: string;
    /** Long description */
    description_long: string;
    /** Regular price */
    price: string;
    /** Sale price */
    sale: string;
    /** Categories */
    category: ProductCategory[];
    /** Stock quantity */
    stock: string;
    /** Image URLs */
    imageUrls: string[];
    /** Integrations */
    integrations: any[];
}

/**
 * Product list response
 */
export interface ProductListResponse {
    /** Products array */
    products: Product[];
    /** Total count */
    total: number;
    /** Current page */
    page: number;
    /** Total pages */
    totalPages: number;
}
