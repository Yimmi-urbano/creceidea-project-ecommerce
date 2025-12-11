/**
 * Configuration Application Services
 * 
 * Business logic for site configuration (SEO, Theme, Social Links).
 * 
 * @module configurationServices
 */

import * as seoRepo from '@/src/infrastructure/repositories/seoRepository';
import * as themeRepo from '@/src/infrastructure/repositories/themeRepository';
import * as socialLinkRepo from '@/src/infrastructure/repositories/socialLinkRepository';
import { SeoMetadata } from '@/src/domain/configuration/SeoMetadata';
import { ThemeConfig } from '@/src/domain/configuration/ThemeConfig';
import { SocialLink, SocialLinkFormData } from '@/src/domain/social/SocialLink';

// ========== SEO Services ==========

/**
 * Get SEO metadata
 * 
 * @returns Promise with SEO data
 */
export const getSeoMetadata = async (): Promise<SeoMetadata> => {
    return seoRepo.fetchSeoMetadata();
};

/**
 * Update SEO metadata
 * Validates SEO data
 * 
 * @param seoData - SEO metadata
 * @returns Promise with updated SEO
 */
export const updateSeoMetadata = async (seoData: SeoMetadata): Promise<SeoMetadata> => {
    // Business logic: validate title length
    if (seoData.title && seoData.title.length > 60) {
        console.warn('SEO title should be less than 60 characters for optimal display');
    }

    // Business logic: validate description length
    if (seoData.meta_description && seoData.meta_description.length > 160) {
        console.warn('Meta description should be less than 160 characters');
    }

    return seoRepo.updateSeoMetadata(seoData);
};

// ========== Theme Services ==========

/**
 * Get theme configuration
 * 
 * @returns Promise with theme config
 */
export const getThemeConfig = async (): Promise<ThemeConfig> => {
    return themeRepo.fetchThemeConfig();
};

/**
 * Update theme colors
 * Validates color format
 * 
 * @param colors - Array of hex colors
 * @returns Promise with updated theme
 */
export const updateThemeColors = async (colors: string[]): Promise<ThemeConfig> => {
    // Business logic: validate hex color format
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    for (const color of colors) {
        if (!hexColorRegex.test(color)) {
            throw new Error(`Invalid color format: ${color}. Use hex format (#RRGGBB)`);
        }
    }

    return themeRepo.updateColors(colors);
};

/**
 * Update theme configuration
 * 
 * @param themeConfig - Theme configuration
 * @returns Promise with updated theme
 */
export const updateThemeConfig = async (themeConfig: ThemeConfig): Promise<ThemeConfig> => {
    return themeRepo.updateThemeConfig(themeConfig);
};

// ========== Social Links Services ==========

/**
 * Get all social links
 * 
 * @returns Promise with social links
 */
export const getSocialLinks = async (): Promise<SocialLink[]> => {
    return socialLinkRepo.fetchSocialLinks();
};

/**
 * Create social link
 * Validates URL format
 * 
 * @param linkData - Social link data
 * @returns Promise with created link
 */
export const createSocialLink = async (
    linkData: SocialLinkFormData
): Promise<SocialLink> => {
    // Business logic: validate URL
    if (!linkData.url || linkData.url.trim().length === 0) {
        throw new Error('URL is required');
    }

    try {
        new URL(linkData.url);
    } catch {
        throw new Error('Invalid URL format');
    }

    // Business logic: validate title
    if (!linkData.title || linkData.title.trim().length === 0) {
        throw new Error('Title is required');
    }

    return socialLinkRepo.createSocialLink(linkData);
};

/**
 * Update social link
 * Validates data
 * 
 * @param linkId - Link ID
 * @param linkData - Updated link data
 * @returns Promise with updated link
 */
export const updateSocialLink = async (
    linkId: string,
    linkData: SocialLinkFormData
): Promise<SocialLink> => {
    // Business logic: validate URL
    if (!linkData.url || linkData.url.trim().length === 0) {
        throw new Error('URL is required');
    }

    try {
        new URL(linkData.url);
    } catch {
        throw new Error('Invalid URL format');
    }

    // Business logic: validate title
    if (!linkData.title || linkData.title.trim().length === 0) {
        throw new Error('Title is required');
    }

    return socialLinkRepo.updateSocialLink(linkId, linkData);
};

/**
 * Delete social link
 * 
 * @param linkId - Link ID
 * @returns Promise<void>
 */
export const deleteSocialLink = async (linkId: string): Promise<void> => {
    return socialLinkRepo.deleteSocialLink(linkId);
};
