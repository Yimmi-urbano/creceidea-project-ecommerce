/**
 * Server-Side HTTP Client
 *
 * Uses native fetch API for server-side data fetching.
 * Optimized for Next.js Server Components and Server Actions.
 * Includes Next.js cache configuration support.
 *
 * @module serverApiClient
 */

import { COOKIE_KEYS } from '@/src/infrastructure/storage/cookieConfig';
import { getDomainFromCookies, getCookie } from '@/src/infrastructure/storage/cookies.server';

/**
 * Server-side fetch options
 */
export interface ServerFetchOptions extends RequestInit {
	/**
	 * Next.js cache revalidation time in seconds
	 */
	revalidate?: number;
	/**
	 * Next.js cache tags for granular revalidation
	 */
	tags?: string[];
}

/**
 * Server-side HTTP client using native fetch
 *
 * @param url - URL to fetch
 * @param options - Fetch options with Next.js cache config
 * @returns Response promise
 */
export async function serverFetch(
	url: string,
	options: ServerFetchOptions = {}
): Promise<Response> {
	const domain = await getDomainFromCookies();
	const session = await getCookie(COOKIE_KEYS.SESSION);

	const headers = new Headers(options.headers);
	headers.set('Content-Type', 'application/json');

	if (domain) {
		headers.set('domain', domain);
	}

	if (session) {
		headers.set('Authorization', `Bearer ${session}`);
	}

	const fetchOptions: RequestInit = {
		...options,
		headers,
	};

	// Add Next.js cache configuration if provided
	if (options.revalidate !== undefined || options.tags) {
		(fetchOptions as any).next = {
			revalidate: options.revalidate,
			tags: options.tags,
		};
	}

	try {
		const response = await fetch(url, fetchOptions);

		if (response.status === 401 || response.status === 403) {
			console.error('Server API Unauthorized:', {
				status: response.status,
				url,
				message: 'Session may have expired',
			});
			throw new Error('AUTH_ERROR_SESSION_EXPIRED');
		}

		if (!response.ok) {
			console.error('Server API Error:', {
				status: response.status,
				statusText: response.statusText,
				url,
			});
		}

		return response;
	} catch (error) {
		if (error instanceof Error && error.message === 'AUTH_ERROR_SESSION_EXPIRED') {
			throw error;
		}
		console.error('Server Fetch Error:', error);
		throw error;
	}
}

/**
 * Server-side GET request
 */
export async function serverGet<T>(url: string, options: ServerFetchOptions = {}): Promise<T> {
	const response = await serverFetch(url, {
		...options,
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}

/**
 * Server-side POST request
 */
export async function serverPost<T>(
	url: string,
	data: any,
	options: ServerFetchOptions = {}
): Promise<T> {
	const response = await serverFetch(url, {
		...options,
		method: 'POST',
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}

/**
 * Server-side PUT request
 */
export async function serverPut<T>(
	url: string,
	data: any,
	options: ServerFetchOptions = {}
): Promise<T> {
	const response = await serverFetch(url, {
		...options,
		method: 'PUT',
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}

/**
 * Server-side PATCH request
 */
export async function serverPatch<T>(
	url: string,
	data: any,
	options: ServerFetchOptions = {}
): Promise<T> {
	const response = await serverFetch(url, {
		...options,
		method: 'PATCH',
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}

/**
 * Server-side DELETE request
 */
export async function serverDelete<T>(url: string, options: ServerFetchOptions = {}): Promise<T> {
	const response = await serverFetch(url, {
		...options,
		method: 'DELETE',
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}
