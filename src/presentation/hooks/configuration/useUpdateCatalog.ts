import { useState } from 'react';

import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';

const useUpdateCatalog = (): {
	updateCatalog: (catalogo: any) => Promise<{ success: boolean; message: string }>;
	updating: boolean;
	currencies: { code: string; symbol: string }[];
	getCurrencies: () => void;
} => {
	const [updating, setUpdating] = useState(false);
	const [currencies, setCurrencies] = useState<{ code: string; symbol: string }[]>([]);

	const updateCatalog = async (catalogo: any): Promise<{ success: boolean; message: string }> => {
		setUpdating(true);
		try {
			const domain = localStorage.getItem('domainSelect');
			const response = await fetch(`${API_ENDPOINTS.CONFIGURATION}/config/catalogo`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					domain: domain ?? '',
				},
				body: JSON.stringify({ catalogo }),
			});

			const data = (await response.json()) as { message: string };
			if (response.ok === false) {
				throw new Error(data.message);
			}

			return { success: true, message: 'Catálogo actualizado correctamente' };
		} catch (error) {
			console.error('Error actualizando el catálogo:', error);
			return { success: false, message: 'Ocurrió un error al actualizar el catálogo.' };
		} finally {
			setUpdating(false);
		}
	};

	const getCurrencies = (): void => {
		const simulatedCurrencies = [
			{ code: 'USD', symbol: '$' },
			{ code: 'PEN', symbol: 'S/' },
		];
		setCurrencies(simulatedCurrencies);
	};

	return { updateCatalog, updating, currencies, getCurrencies };
};

export default useUpdateCatalog;
