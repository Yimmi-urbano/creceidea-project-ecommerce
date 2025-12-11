/**
 * Banner Domain Entity
 * 
 * Represents a promotional banner in the e-commerce system.
 * Banners can have images, text, and action buttons.
 * 
 * @module Banner
 */

/**
 * Banner button configuration
 */
export interface BannerButton {
    /** Button action type (e.g., "link", "product", "category") */
    action: string;
    /** Destination URL or ID */
    destino: string;
    /** Whether button is shown */
    show: boolean;
    /** Button text */
    text_button: string;
    /** Button ID */
    _id?: string;
}

/**
 * Complete Banner entity
 */
export interface Banner {
    /** Unique banner identifier */
    _id: string;
    /** Banner image URL */
    image: string;
    /** Banner text/title */
    text: string;
    /** Banner action buttons */
    button: BannerButton[];
    /** Whether banner is active */
    isActive?: boolean;
    /** Display order */
    order?: number;
    /** Created date */
    createdAt?: string;
    /** Updated date */
    updatedAt?: string;
}

/**
 * Banner form data (for create/update)
 */
export interface BannerFormData {
    /** Banner image file or URL */
    image: string | File;
    /** Banner text */
    text: string;
    /** Button action */
    action: string;
    /** Button destination */
    destino: string;
    /** Button text */
    text_button: string;
}
