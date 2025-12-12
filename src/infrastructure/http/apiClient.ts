/**
 * Axios HTTP Client for Browser-Side API Calls
 * 
 * Configured with automatic domain header injection from localStorage.
 * Includes request/response interceptors for global error handling.
 * 
 * @module apiClient
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { getDomainFromLocalStorage } from '@/src/infrastructure/storage/localStorage';

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
 * Automatically adds domain header from localStorage to all requests
 */
apiClient.interceptors.request.use(
    (config) => {
        const domain = getDomainFromLocalStorage();
        if (domain && config.headers) {
            config.headers['domain'] = domain;
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
        // Global error handling
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
