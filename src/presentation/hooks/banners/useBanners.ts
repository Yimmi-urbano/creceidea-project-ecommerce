/**
 * Banners Hook
 * 
 * Custom hook for banner operations.
 * Uses banner services for data fetching and mutations.
 * 
 * @module useBanners
 */

'use client'

import { useState, useEffect } from 'react';
import * as bannerServices from '@/src/application/banners/bannerServices';
import { Banner } from '@/src/domain/banners/Banner';

/**
 * Hook for managing banners
 * 
 * @returns Banner data and operations
 */
export const useBanners = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch all banners
     */
    const fetchBanners = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await bannerServices.getBanners();
            setBanners(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching banners');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create new banner
     */
    const createBanner = async (
        file: File,
        text: string,
        action: string,
        destino: string,
        text_button: string
    ) => {
        setLoading(true);
        setError(null);

        try {
            await bannerServices.createBanner(file, text, action, destino, text_button);
            await fetchBanners(); // Refresh list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creating banner';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update existing banner
     */
    const updateBanner = async (
        bannerId: string,
        file: File | null,
        imageUrl: string,
        text: string,
        action: string,
        destino: string,
        text_button: string
    ) => {
        setLoading(true);
        setError(null);

        try {
            await bannerServices.updateBanner(
                bannerId,
                file,
                imageUrl,
                text,
                action,
                destino,
                text_button
            );
            await fetchBanners(); // Refresh list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error updating banner';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete banner
     */
    const deleteBanner = async (bannerId: string) => {
        setLoading(true);
        setError(null);

        try {
            await bannerServices.deleteBanner(bannerId);
            await fetchBanners(); // Refresh list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error deleting banner';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return {
        banners,
        loading,
        error,
        createBanner,
        updateBanner,
        deleteBanner,
        refresh: fetchBanners,
    };
};

/**
 * Hook for single banner
 * 
 * @param bannerId - Banner ID
 * @returns Banner data and loading state
 */
export const useBanner = (bannerId: string) => {
    const [banner, setBanner] = useState<Banner | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await bannerServices.getBannerById(bannerId);
                setBanner(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching banner');
            } finally {
                setLoading(false);
            }
        };

        if (bannerId) {
            fetchBanner();
        }
    }, [bannerId]);

    return { banner, loading, error };
};
