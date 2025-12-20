/**
 * Cookie configuration and keys
 * Separated from server actions to be accessible by client components
 */

export const COOKIE_KEYS = {
	DOMAIN_SELECT: 'domainSelect',
	SESSION: 'session',
	THEME: 'theme',
} as const;

export const SECURE_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax' as const,
	maxAge: 60 * 60 * 24 * 30, // 30 days
};
