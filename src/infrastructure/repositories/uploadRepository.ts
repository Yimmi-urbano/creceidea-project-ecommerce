/**
 * Upload Repository
 * 
 * Handles all file upload operations.
 * Supports product images, logos, and banners.
 * Includes automatic image compression.
 * 
 * @module uploadRepository
 */

import imageCompression from 'browser-image-compression';
import { getDomainFromLocalStorage } from '@/src/infrastructure/storage/localStorage';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';

/**
 * Image compression options
 */
const COMPRESSION_OPTIONS = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
};

/**
 * Upload image with automatic compression
 * 
 * @param file - Image file to upload
 * @param type - Upload type ('product' | 'logo' | 'banner')
 * @returns Promise with uploaded image URL
 */
export const uploadImage = async (
    file: File,
    type: 'product' | 'logo' | 'banner' = 'product'
): Promise<string> => {
    const domain = getDomainFromLocalStorage();
    const domainPrimary = domain.split('.')[0];

    try {
        // Compress image
        const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);

        // Generate unique filename with timestamp
        const originalName = file.name;
        const version = Date.now();
        const extension = originalName.split('.').pop();
        const baseName = originalName.split('.')[0];
        const newFileName = `${baseName}-${version}.${extension}`;

        // Create renamed file
        const renamedFile = new File([compressedFile], newFileName, {
            type: compressedFile.type,
        });

        // Prepare form data
        const formData = new FormData();
        formData.append('image', renamedFile);

        // Determine upload endpoint based on type
        let uploadUrl: string;
        switch (type) {
            case 'logo':
                uploadUrl = API_ENDPOINTS.UPLOAD_LOGO;
                break;
            case 'banner':
                uploadUrl = API_ENDPOINTS.UPLOAD_BANNER;
                break;
            case 'product':
            default:
                uploadUrl = API_ENDPOINTS.UPLOAD_PRODUCT_IMAGE;
        }

        // Upload image
        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                domain: domainPrimary,
            },
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            return result.imageUrl;
        } else {
            console.error('Error uploading image:', result);
            throw new Error('Error en la carga de imagen');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

/**
 * Upload product image (convenience method)
 * 
 * @param file - Image file
 * @returns Promise with image URL
 */
export const uploadProductImage = async (file: File): Promise<string> => {
    return uploadImage(file, 'product');
};

/**
 * Upload logo image (convenience method)
 * 
 * @param file - Logo file
 * @returns Promise with logo URL
 */
export const uploadLogo = async (file: File): Promise<string> => {
    return uploadImage(file, 'logo');
};

/**
 * Upload banner image (convenience method)
 * 
 * @param file - Banner file
 * @returns Promise with banner URL
 */
export const uploadBanner = async (file: File): Promise<string> => {
    return uploadImage(file, 'banner');
};
