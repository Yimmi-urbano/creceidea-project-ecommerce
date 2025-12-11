/**
 * Social Link Domain Entity
 * 
 * Represents a social media link/profile for the e-commerce site.
 * 
 * @module SocialLink
 */

/**
 * Social Link entity
 */
export interface SocialLink {
    /** Unique identifier */
    _id: string;
    /** Social platform title (e.g., "Facebook", "Instagram") */
    title: string;
    /** Icon identifier/class */
    icon: string;
    /** Social profile URL */
    url: string;
    /** Whether link is active/visible */
    is_active: boolean;
    /** Display order */
    order?: number;
    /** Created date */
    createdAt?: string;
    /** Updated date */
    updatedAt?: string;
}

/**
 * Social link form data (for create/update)
 */
export interface SocialLinkFormData {
    /** Platform title */
    title: string;
    /** Icon identifier */
    icon: string;
    /** Profile URL */
    url: string;
    /** Active status */
    is_active: boolean;
}

/**
 * Icon option for social platform selection
 */
export interface IconOption {
    /** Icon key/identifier */
    key: string;
    /** Display value/name */
    value: string;
}
