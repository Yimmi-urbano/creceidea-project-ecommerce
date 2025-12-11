import { uploadImage } from '@/hooks/fetchProducts';

const getDomainFromLocalStorage = (): string => {
    const domain = localStorage.getItem('domainSelect');
    return domain ? domain: '';
};

export const fetchBanners = async (): Promise<Banner[]> => {
    const domain = getDomainFromLocalStorage();
    const response = await fetch('https://api-configuration.creceidea.pe/api/banners', {
        headers: {
            'domain': domain,
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching banners');
    }

    return response.json();
};

export const getBanner = async (bannerId: string): Promise<Banner> => {
    const domain = getDomainFromLocalStorage();
    const response = await fetch(`https://api-configuration.creceidea.pe/api/banners/${bannerId}`, {
        headers: {
            'domain': domain,
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching banner');
    }

    return response.json();
};

export const submitBanner = async (
    file: File,
    text: string,
    action: string,
    destino: string,
    text_button: string
): Promise<void> => {
    const domain = getDomainFromLocalStorage();
    const imageUrl = await uploadImage(file);

    const response = await fetch('https://api-configuration.creceidea.pe/api/banners', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'domain': domain,
        },
        body: JSON.stringify({
            image: imageUrl,
            text,
            button: [
                {
                    action,
                    destino,
                    show: true,
                    text_button,
                },
            ],
        }),
    });

    if (!response.ok) {
        throw new Error('Error creating banner');
    }
};

export const updateBanner = async (
    bannerId: string,
    file: File | null,
    imageUrl: string,
    text: string,
    action: string,
    destino: string,
    text_button: string
): Promise<void> => {
    const domain = getDomainFromLocalStorage();

    if (file) {
        imageUrl = await uploadImage(file);
    }

    const response = await fetch(`https://api-configuration.creceidea.pe/api/banners/${bannerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'domain': domain,
        },
        body: JSON.stringify({
            image: imageUrl || '', // Si no hay nueva imagen, usa la URL existente
            text,
            button: [
                {
                    action,
                    destino,
                    show: true,
                    text_button,
                },
            ],
        }),
    });

    if (!response.ok) {
        throw new Error('Error updating banner');
    }
};

interface ButtonData {
    action: string;
    destino: string;
    show: boolean;
    text_button: string;
    _id: string;
}

export interface Banner {
    image: string;
    text: string;
    button: ButtonData[];
    _id: string;
}

export const deleteBanner = async (bannerId: string): Promise<void> => {
    const domain = getDomainFromLocalStorage();

    try {
        const response = await fetch(`https://api-configuration.creceidea.pe/api/banners/${bannerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'domain': domain,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al eliminar el banner:', error);
            throw new Error('Error al eliminar el banner');
        }
    } catch (error) {
        console.error('Error en la eliminación del banner:', error);
        throw error;
    }
};
