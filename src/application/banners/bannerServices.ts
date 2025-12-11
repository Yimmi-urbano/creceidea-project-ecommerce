/**
 * Banner Application Services
 * 
 * Business logic layer for banner operations.
 * 
 * @module bannerServices
 */

import * as bannerRepo from '@/src/infrastructure/repositories/bannerRepository';
import { Banner } from '@/src/domain/banners/Banner';

/**
 * Get all banners
 * 
 * @returns Promise with banners array
 */
export const getBanners = async (): Promise<Banner[]> => {
    return bannerRepo.fetchBanners();
};

/**
 * Get banner by ID
 * 
 * @param bannerId - Banner ID
 * @returns Promise with banner
 */
export const getBannerById = async (bannerId: string): Promise<Banner> => {
    return bannerRepo.fetchBannerById(bannerId);
};

/**
 * Create new banner
 * Validates data and creates banner with image upload
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
    // Business logic: validate required fields
    if (!file) {
        throw new Error('Banner image is required');
    }

    if (!text || text.trim().length === 0) {
        throw new Error('Banner text is required');
    }

    // Business logic: validate image type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid image type. Use JPG, PNG, or WebP');
    }

    // Business logic: validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error('Image size must be less than 5MB');
    }

    return bannerRepo.createBanner(file, text.trim(), action, destino, text_button);
};

/**
 * Update existing banner
 * Validates data and updates banner
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
    // Business logic: validate text
    if (!text || text.trim().length === 0) {
        throw new Error('Banner text is required');
    }

    // Business logic: validate new image if provided
    if (file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid image type. Use JPG, PNG, or WebP');
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('Image size must be less than 5MB');
        }
    }

    return bannerRepo.updateBanner(
        bannerId,
        file,
        imageUrl,
        text.trim(),
        action,
        destino,
        text_button
    );
};

/**
 * Delete banner
 * 
 * @param bannerId - Banner ID
 * @returns Promise<void>
 */
export const deleteBanner = async (bannerId: string): Promise<void> => {
    return bannerRepo.deleteBanner(bannerId);
};
