/**
 * Banner Server Actions
 * 
 * Next.js Server Actions for banner operations.
 * Note: Image upload handled separately in client-side hooks.
 * 
 * @module bannerActions
 */

'use server'

import { revalidatePath } from 'next/cache';

/**
 * Delete banner action
 * 
 * @param bannerId - Banner ID
 * @returns Success status
 */
export async function deleteBannerAction(bannerId: string) {
    try {
        // Import dynamically to avoid issues
        const { deleteBanner } = await import('@/src/infrastructure/repositories/bannerRepository');

        await deleteBanner(bannerId);

        // Revalidate banner pages
        revalidatePath('/dashboard/banners');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error deleting banner',
        };
    }
}

/**
 * Revalidate banner pages
 * Useful after client-side banner creation/update
 * 
 * @returns Success status
 */
export async function revalidateBannersAction() {
    try {
        revalidatePath('/dashboard/banners');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error revalidating',
        };
    }
}
