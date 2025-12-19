/**
 * Axios HTTP Client for Browser-Side API Calls
 * 
 * Configured with automatic domain header injection from localStorage.
 * Includes request/response interceptors for global error handling.
 * 
 * @module apiClient
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { getDomainFromLocalStorage, STORAGE_KEYS } from '@/src/infrastructure/storage/localStorage';

/**
 * Axios instance configured for browser-side API calls
 */
const apiClient: AxiosInstance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * Automatically adds domain and auth headers
 */
apiClient.interceptors.request.use(
    (config) => {
        const domain = getDomainFromLocalStorage();
        const token = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.TOKEN) : null;

        if (domain && config.headers) {
            config.headers['domain'] = domain;
        }

        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Global error handling for API responses
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;

        // Session expired or unauthorized
        if (status === 401 || status === 403) {
            console.error('Session expired or unauthorized. Redirecting to login...');

            // Avoid redirect loops or clearing if already on login
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                import('@/src/infrastructure/storage/localStorage').then(({ logout }) => {
                    logout();
                });
            }
        }

        if (error.response) {
            // Server responded with error status
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                url: error.config?.url,
            });
        } else if (error.request) {
            // Request made but no response received
            console.error('Network Error:', error.message);
        } else {
            // Error in request configuration
            console.error('Request Configuration Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
