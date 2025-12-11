/**
 * Site Configuration Domain Entity
 * 
 * Represents general site configuration and settings.
 * 
 * @module SiteConfig
 */

import { SeoMetadata } from './SeoMetadata';
import { WhatsappHome, WhatsappCatalog } from './WhatsappConfig';
import { ThemeConfig } from './ThemeConfig';

/**
 * Catalog button configuration
 */
export interface CatalogButton {
    /** Button text */
    text: string;
    /** Button action */
    action: string;
    /** Background color */
    color_bg: string;
    /** Text color */
    color_text: string;
}

/**
 * Currency configuration
 */
export interface Currency {
    /** Currency code (e.g., "PEN", "USD") */
    code: string;
    /** Currency symbol (e.g., "S/", "$") */
    symbol: string;
}

/**
 * Catalog configuration
 */
export interface CatalogConfig {
    /** Catalog button settings */
    button: CatalogButton;
    /** WhatsApp settings for catalog */
    whatsapp: WhatsappCatalog;
    /** Currency settings */
    currency: Currency;
}

/**
 * Complete Site Configuration
 */
export interface SiteConfiguration {
    /** Site logo URL */
    logo: string;
    /** Site title */
    title?: string;
    /** Site slogan */
    slogan?: string;
    /** SEO metadata */
    meta_description?: string;
    meta_keyword?: string;
    /** Theme configuration */
    theme?: string;
    /** WhatsApp home configuration */
    whatsapp_home: WhatsappHome;
    /** Catalog configuration */
    catalogo?: CatalogConfig;
    /** Integrations */
    integrations?: any[];
    /** Created date */
    createdAt?: string;
    /** Updated date */
    updatedAt?: string;
}
