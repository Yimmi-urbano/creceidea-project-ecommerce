/**
 * WhatsApp Configuration Domain Entity
 * 
 * Represents WhatsApp integration settings for the e-commerce site.
 * 
 * @module WhatsappConfig
 */

/**
 * WhatsApp home configuration
 */
export interface WhatsappHome {
    /** WhatsApp phone number */
    number: string;
    /** Custom message template */
    message_custom: string;
    /** Whether WhatsApp integration is active */
    isActive: boolean;
}

/**
 * WhatsApp catalog configuration
 */
export interface WhatsappCatalog {
    /** WhatsApp phone number */
    number: string;
    /** Custom message template */
    message_custom: string;
    /** Whether WhatsApp is active for catalog */
    isActive: boolean;
}
