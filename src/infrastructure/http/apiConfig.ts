/**
 * Centralized API Endpoint Configuration
 * 
 * All API URLs are defined here for easy maintenance and updates.
 * Uses environment variables where available, with fallbacks for development.
 * 
 * @module apiConfig
 */

export const API_ENDPOINTS = {
    // Authentication
    AUTH: process.env.NEXT_PUBLIC_API_URL_AUTH || '',

    // Products & Inventory
    PRODUCTS: process.env.NEXT_PUBLIC_PRODUCTS || '',
    CATEGORIES: 'https://api-categories.creceidea.pe/api/categories',

    // Configuration & Settings
    CONFIGURATION: process.env.NEXT_PUBLIC_CONFIGURATION || '',
    CONFIGURATIONS: 'https://api-configuration.creceidea.pe/api/configurations',
    BANNERS: 'https://api-configuration.creceidea.pe/api/banners',
    THEMES: 'https://api-theme.creceidea.pe/api/themes',

    // Upload Services
    UPLOAD: 'https://api-upload.creceidea.pe',
    UPLOAD_PRODUCT_IMAGE: 'https://api-upload.creceidea.pe/image/product',
    UPLOAD_LOGO: 'https://api-upload.creceidea.pe/logo',
    UPLOAD_BANNER: 'https://api-upload.creceidea.pe/banner',

    // Payment Methods
    PAYMENT_METHODS: 'https://api-payment-method.creceidea.pe/api/payments',

    // Social
    SOCIAL_LINK: 'https://api-configuration.creceidea.pe/api/social-link',

    // Orders
    ORDERS: 'https://api-orders.creceidea.pe/api/orders/list',
    ORDER_BY_ID: 'https://api-orders.creceidea.pe/api/orders/id',

    // Domains
    DOMAINS: process.env.NEXT_PUBLIC_DOMAINS_ASSIGNED || '',

    // Modules
    INSTALLED_MODULES: 'https://api-installed-modules.creceidea.pe/modules',
} as const;

/**
 * Type for API endpoint values
 */
export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

/**
 * Helper to build full URL with path
 * @param endpoint - Base endpoint from API_ENDPOINTS
 * @param path - Additional path to append
 * @returns Full URL
 */
export const buildUrl = (endpoint: string, path: string = ''): string => {
    const base = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return path ? `${base}${cleanPath}` : base;
};
