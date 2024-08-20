export interface WooCommerceProduct {
    name: string;
    type: 'simple' | 'grouped' | 'external' | 'variable';
    regular_price: string;
    description?: string;
    short_description?: string;
    categories?: { id: number }[];
    images?: { src: string }[];
    sku?: string;
    stock_quantity?: number;
    manage_stock?: boolean;
    status?: 'draft' | 'pending' | 'private' | 'publish';
    [key: string]: any; // Para permitir campos adicionales
}

