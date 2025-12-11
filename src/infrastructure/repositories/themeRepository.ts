/**
 * Theme Repository
 * 
 * Handles theme and color customization operations.
 * Communicates with the configuration API.
 * 
 * @module themeRepository
 */

import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { ThemeConfig } from '@/src/domain/configuration/ThemeConfig';

/**
 * Update theme colors
 * 
 * @param colors - Array of color hex values
 * @returns Promise with updated theme
 */
export const updateColors = async (colors: string[]): Promise<ThemeConfig> => {
    const response = await apiClient.put(`${API_ENDPOINTS.CONFIGURATION}/colors`, {
        colors,
    });
    return response.data;
};

/**
 * Fetch current theme configuration
 * 
 * @returns Promise with theme config
 */
export const fetchThemeConfig = async (): Promise<ThemeConfig> => {
    const response = await apiClient.get(`${API_ENDPOINTS.CONFIGURATION}/theme`);
    return response.data;
};

/**
 * Update theme configuration
 * 
 * @param themeConfig - Theme configuration
 * @returns Promise with updated theme
 */
export const updateThemeConfig = async (themeConfig: ThemeConfig): Promise<ThemeConfig> => {
    const response = await apiClient.put(
        `${API_ENDPOINTS.CONFIGURATION}/theme`,
        themeConfig
    );
    return response.data;
};
