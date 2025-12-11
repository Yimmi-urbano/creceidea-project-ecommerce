/**
 * Banner Repository
 * 
 * Handles all banner-related data operations.
 * Communicates with the banners API.
 * 
 * @module bannerRepository
 */

import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { Banner, BannerFormData } from '@/src/domain/banners/Banner';
import { uploadImage } from './uploadRepository';

/**
 * Fetch all banners
 * 
 * @returns Promise with banners array
 */
export const fetchBanners = async (): Promise<Banner[]> => {
    const response = await apiClient.get(API_ENDPOINTS.BANNERS);
    return response.data;
};

/**
 * Get banner by ID
 * 
 * @param bannerId - Banner ID
 * @returns Promise with banner data
 */
export const fetchBannerById = async (bannerId: string): Promise<Banner> => {
    const response = await apiClient.get(`${API_ENDPOINTS.BANNERS}/${bannerId}`);
    return response.data;
};

/**
 * Create new banner
 * 
 * @param file - Banner image file
 * @param text - Banner text
 * @param action - Button action
 * @param destino - Button destination
 * @param text_button - Button text
 * @returns Promise<void>
 */
export const createBanner = async (
    file: File,
    text: string,
    action: string,
    destino: string,
    text_button: string
): Promise<void> => {
    // Upload image first
    const imageUrl = await uploadImage(file, 'banner');

    // Create banner with uploaded image
    await apiClient.post(API_ENDPOINTS.BANNERS, {
        image: imageUrl,
        text,
        button: [
            {
                action,
                destino,
                show: true,
                text_button,
            },
        ],
    });
};

/**
 * Update existing banner
 * 
 * @param bannerId - Banner ID
 * @param file - New image file (optional)
 * @param imageUrl - Existing image URL
 * @param text - Banner text
 * @param action - Button action
 * @param destino - Button destination
 * @param text_button - Button text
 * @returns Promise<void>
 */
export const updateBanner = async (
    bannerId: string,
    file: File | null,
    imageUrl: string,
    text: string,
    action: string,
    destino: string,
    text_button: string
): Promise<void> => {
    let finalImageUrl = imageUrl;

    // Upload new image if provided
    if (file) {
        finalImageUrl = await uploadImage(file, 'banner');
    }

    // Update banner
    await apiClient.put(`${API_ENDPOINTS.BANNERS}/${bannerId}`, {
        image: finalImageUrl || '',
        text,
        button: [
            {
                action,
                destino,
                show: true,
                text_button,
            },
        ],
    });
};

/**
 * Delete banner
 * 
 * @param bannerId - Banner ID
 * @returns Promise<void>
 */
export const deleteBanner = async (bannerId: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.BANNERS}/${bannerId}`);
};
