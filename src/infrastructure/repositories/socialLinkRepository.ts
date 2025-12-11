/**
 * Social Link Repository
 * 
 * Handles social media links operations.
 * Communicates with the configuration API.
 * 
 * @module socialLinkRepository
 */

import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { SocialLink, SocialLinkFormData } from '@/src/domain/social/SocialLink';

/**
 * Fetch all social links
 * 
 * @returns Promise with social links array
 */
export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
    const response = await apiClient.get(`${API_ENDPOINTS.CONFIGURATION}/social-links`);
    return response.data;
};

/**
 * Create new social link
 * 
 * @param linkData - Social link data
 * @returns Promise with created link
 */
export const createSocialLink = async (linkData: SocialLinkFormData): Promise<SocialLink> => {
    const response = await apiClient.post(
        `${API_ENDPOINTS.CONFIGURATION}/social-links`,
        linkData
    );
    return response.data;
};

/**
 * Update existing social link
 * 
 * @param linkId - Link ID
 * @param linkData - Updated link data
 * @returns Promise with updated link
 */
export const updateSocialLink = async (
    linkId: string,
    linkData: SocialLinkFormData
): Promise<SocialLink> => {
    const response = await apiClient.put(
        `${API_ENDPOINTS.CONFIGURATION}/social-links/${linkId}`,
        linkData
    );
    return response.data;
};

/**
 * Delete social link
 * 
 * @param linkId - Link ID
 * @returns Promise<void>
 */
export const deleteSocialLink = async (linkId: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.CONFIGURATION}/social-links/${linkId}`);
};
