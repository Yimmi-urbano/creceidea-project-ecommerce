/**
 * SEO Metadata Domain Entity
 * 
 * Represents SEO configuration for the e-commerce site.
 * 
 * @module SeoMetadata
 */

/**
 * SEO Metadata entity
 */
export interface SeoMetadata {
    /** Page title */
    title?: string;
    /** Meta description */
    meta_description?: string;
    /** Meta keywords */
    meta_keyword?: string;
    /** Site slogan */
    slogan?: string;
    /** Open Graph image */
    og_image?: string;
    /** Canonical URL */
    canonical_url?: string;
}
