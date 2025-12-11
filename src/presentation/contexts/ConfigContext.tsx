/**
 * Configuration Context
 * 
 * Provides site configuration data throughout the application.
 * Fetches configuration from API and makes it available via context.
 * 
 * @module ConfigContext
 */

'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getDomainFromLocalStorage } from '@/src/infrastructure/storage/localStorage';
import { SiteConfiguration } from '@/src/domain/configuration/SiteConfig';

interface ConfigContextType {
    config: SiteConfiguration | null;
    loading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

/**
 * Hook to access configuration context
 * 
 * @returns Configuration context
 * @throws Error if used outside ConfigProvider
 */
export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};

/**
 * Configuration Provider Component
 * Fetches and provides site configuration
 */
export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<SiteConfiguration | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            const domain = getDomainFromLocalStorage();

            if (!domain) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://api-configuration.creceidea.pe/api/configurations`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            domain: domain,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setConfig(data[0]);
                }
            } catch (error) {
                console.error('Error fetching configuration:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ config, loading }}>
            {children}
        </ConfigContext.Provider>
    );
};
