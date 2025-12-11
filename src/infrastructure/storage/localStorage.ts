/**
 * Browser LocalStorage Abstraction
 * 
 * Provides type-safe, SSR-safe access to browser localStorage.
 * All localStorage operations should go through these functions.
 * 
 * @module localStorage
 */

/**
 * Storage keys used in the application
 */
export const STORAGE_KEYS = {
    DOMAIN_SELECT: 'domainSelect',
    SELECTED_CARD_ID: 'selectedCardId',
    THEME: 'theme',
} as const;

/**
 * Get domain from localStorage
 * SSR-safe: returns empty string on server
 * 
 * @returns Domain string or empty string
 */
export const getDomainFromLocalStorage = (): string => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEYS.DOMAIN_SELECT) ?? '';
};

/**
 * Set domain to localStorage
 * SSR-safe: no-op on server
 * 
 * @param domain - Domain to store
 */
export const setDomainToLocalStorage = (domain: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.DOMAIN_SELECT, domain);
    }
};

/**
 * Get selected product ID from localStorage
 * SSR-safe: returns null on server
 * 
 * @returns Product ID or null
 */
export const getSelectedProductId = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.SELECTED_CARD_ID);
};

/**
 * Set selected product ID to localStorage
 * SSR-safe: no-op on server
 * 
 * @param id - Product ID to store
 */
export const setSelectedProductId = (id: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SELECTED_CARD_ID, id);
    }
};

/**
 * Clear selected product ID from localStorage
 * SSR-safe: no-op on server
 */
export const clearSelectedProductId = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_CARD_ID);
    }
};

/**
 * Get theme preference from localStorage
 * SSR-safe: returns null on server
 * 
 * @returns Theme ('light' | 'dark') or null
 */
export const getThemeFromLocalStorage = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.THEME);
};

/**
 * Set theme preference to localStorage
 * SSR-safe: no-op on server
 * 
 * @param theme - Theme to store ('light' | 'dark')
 */
export const setThemeToLocalStorage = (theme: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
};

/**
 * Generic get from localStorage with type safety
 * SSR-safe: returns null on server
 * 
 * @param key - Storage key
 * @returns Stored value or null
 */
export const getItem = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
};

/**
 * Generic set to localStorage
 * SSR-safe: no-op on server
 * 
 * @param key - Storage key
 * @param value - Value to store
 */
export const setItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};

/**
 * Generic remove from localStorage
 * SSR-safe: no-op on server
 * 
 * @param key - Storage key
 */
export const removeItem = (key: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

/**
 * Clear all localStorage
 * SSR-safe: no-op on server
 */
export const clearAll = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.clear();
    }
};
