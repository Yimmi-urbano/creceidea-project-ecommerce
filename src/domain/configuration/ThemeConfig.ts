/**
 * Theme Configuration Domain Entity
 * 
 * Represents theme and color customization settings.
 * 
 * @module ThemeConfig
 */

/**
 * Theme type
 */
export type ThemeType = 'light' | 'dark' | 'system';

/**
 * Theme configuration
 */
export interface ThemeConfig {
    /** Current theme */
    theme: ThemeType;
    /** Primary color */
    primaryColor?: string;
    /** Secondary color */
    secondaryColor?: string;
    /** Accent color */
    accentColor?: string;
    /** Custom colors array */
    colors?: string[];
}

/**
 * Color palette
 */
export interface ColorPalette {
    /** Color name/identifier */
    name: string;
    /** Hex color value */
    value: string;
    /** Whether this is the primary color */
    isPrimary?: boolean;
}
