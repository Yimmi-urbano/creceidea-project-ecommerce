/**
 * Configuration Context
 *
 * Provides site configuration data throughout the application.
 * Fetches configuration from API and makes it available via context.
 *
 * @module ConfigContext
 */

'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SiteConfiguration } from '@/src/domain/configuration/SiteConfig';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { getDomainFromLocalStorage } from '@/src/infrastructure/storage/localStorage';

interface ConfigContextType {
	config: SiteConfiguration | null;
	loading: boolean;
	error: string | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

/**
 * Hook to access configuration context
 *
 * @returns Configuration context
 * @throws Error if used outside ConfigProvider
 */
export const useConfig = (): ConfigContextType => {
	const context = useContext(ConfigContext);
	if (context === undefined) {
		throw new Error('useConfig must be used within a ConfigProvider');
	}
	return context;
};

/**
 * Configuration Provider Component
 * Fetches and provides site configuration
 */
export const ConfigProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const [config, setConfig] = useState<SiteConfiguration | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchConfig = async (): Promise<void> => {
			try {
				const domain = getDomainFromLocalStorage();

				if (domain === null || domain === '') {
					console.warn('No domain found in localStorage - session may have expired');
					setError('No domain configured');
					setLoading(false);

					// Redirect to login after a short delay
					setTimeout(() => {
						router.push('/login');
					}, 1000);
					return;
				}

				const response = await fetch(API_ENDPOINTS.CONFIGURATIONS, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						domain: domain,
					},
				});

				if (response.ok === true) {
					const data = (await response.json()) as SiteConfiguration[];
					if (data.length > 0) {
						setConfig(data[0]);
					}
					setError(null);
				} else if (response.status === 401 || response.status === 403) {
					// Unauthorized - session expired
					console.warn('Unauthorized access - redirecting to login');
					setError('Session expired');
					router.push('/login');
				} else {
					setError(`Failed to fetch configuration: ${String(response.status)}`);
				}
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Unknown error';
				console.error('Error fetching configuration:', errorMessage);
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		void fetchConfig();
	}, [router]);

	return (
		<ConfigContext.Provider value={{ config, loading, error }}>{children}</ConfigContext.Provider>
	);
};
