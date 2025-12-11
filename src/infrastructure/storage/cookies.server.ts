/**
 * Server-Side Cookie Management
 * 
 * Provides access to cookies in Server Components and Server Actions.
 * Uses Next.js cookies() API for server-side cookie operations.
 * 
 * @module cookies.server
 */

'use server'

import { cookies } from 'next/headers';

/**
 * Cookie keys used in the application
 */
export const COOKIE_KEYS = {
    DOMAIN_SELECT: 'domainSelect',
    SESSION: 'session',
    THEME: 'theme',
} as const;

/**
 * Cookie options for secure cookies
 */
const SECURE_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 30, // 30 days
};

/**
 * Get domain from cookies (server-side)
 * 
 * @returns Domain string or empty string
 */
export async function getDomainFromCookies(): Promise<string> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_KEYS.DOMAIN_SELECT)?.value ?? '';
}

/**
 * Set domain to cookies (server-side)
 * 
 * @param domain - Domain to store
 */
export async function setDomainToCookies(domain: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_KEYS.DOMAIN_SELECT, domain, SECURE_COOKIE_OPTIONS);
}

/**
 * Get theme from cookies (server-side)
 * 
 * @returns Theme ('light' | 'dark') or null
 */
export async function getThemeFromCookies(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_KEYS.THEME)?.value ?? null;
}

/**
 * Set theme to cookies (server-side)
 * 
 * @param theme - Theme to store ('light' | 'dark')
 */
export async function setThemeToCookies(theme: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_KEYS.THEME, theme, {
        ...SECURE_COOKIE_OPTIONS,
        httpOnly: false, // Theme needs to be accessible from client
    });
}

/**
 * Generic get from cookies (server-side)
 * 
 * @param key - Cookie key
 * @returns Cookie value or null
 */
export async function getCookie(key: string): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value ?? null;
}

/**
 * Generic set to cookies (server-side)
 * 
 * @param key - Cookie key
 * @param value - Value to store
 * @param options - Optional cookie options
 */
export async function setCookie(
    key: string,
    value: string,
    options: Partial<typeof SECURE_COOKIE_OPTIONS> = {}
): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(key, value, {
        ...SECURE_COOKIE_OPTIONS,
        ...options,
    });
}

/**
 * Delete cookie (server-side)
 * 
 * @param key - Cookie key
 */
export async function deleteCookie(key: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}
