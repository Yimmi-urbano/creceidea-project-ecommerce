/**
 * SEO Repository
 * 
 * Handles SEO metadata operations.
 * Communicates with the configuration API.
 * 
 * @module seoRepository
 */

import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { SeoMetadata } from '@/src/domain/configuration/SeoMetadata';

/**
 * Update SEO metadata
 * 
 * @param seoData - SEO metadata to update
 * @returns Promise with updated SEO data
 */
export const updateSeoMetadata = async (seoData: SeoMetadata): Promise<SeoMetadata> => {
    const response = await apiClient.put(`${API_ENDPOINTS.CONFIGURATION}/seo`, seoData);
    return response.data;
};

/**
 * Fetch current SEO metadata
 * 
 * @returns Promise with SEO data
 */
export const fetchSeoMetadata = async (): Promise<SeoMetadata> => {
    const response = await apiClient.get(`${API_ENDPOINTS.CONFIGURATION}/seo`);
    return response.data;
};
