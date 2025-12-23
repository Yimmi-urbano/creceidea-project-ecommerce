import { useEffect, useState } from 'react';

import { API_ENDPOINTS, buildUrl } from '@/src/infrastructure/http/apiConfig';

interface Theme {
	_id: string;
	title: string;
	type_theme: string;
	name: string;
	images: string[];
	category: string;
	status: boolean;
	url_demo: string;
	price: number;
	sale_price: number;
}

export const useThemes = (): {
	themes: Theme[];
	loading: boolean;
	selectedTheme: string | null;
	handleSingleCheckboxChange: (
		themeId: string,
		checked: boolean,
		themeName: string,
		isFree: boolean
	) => void;
	updateSuccess: boolean | null;
	setUpdateSuccess: (success: boolean | null) => void;
} => {
	const [themes, setThemes] = useState<Theme[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
	const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

	const fetchThemes = async (): Promise<void> => {
		try {
			const response = await fetch(API_ENDPOINTS.THEMES);
			const data = (await response.json()) as Theme[];
			setThemes(data);
			setLoading(false);
		} catch (error) {
			console.error('Error al obtener los temas:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		void fetchThemes();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const updateTheme = async (themeName: string | null): Promise<void> => {
		try {
			const domainFromStorage = localStorage.getItem('domainSelect');
			const domain =
				domainFromStorage !== null && domainFromStorage !== ''
					? domainFromStorage
					: 'donguston.creceidea.pe';
			console.log('Enviando actualización a la API con theme:', String(themeName));

			const response = await fetch(buildUrl(API_ENDPOINTS.CONFIGURATION, '/config/theme'), {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					domain: domain,
				},
				body: JSON.stringify({ theme: themeName }),
			});

			if (response.ok === false) {
				setUpdateSuccess(false);
				throw new Error('Error al actualizar el tema');
			}

			console.log('Tema actualizado con éxito');
			setUpdateSuccess(true);
		} catch (error) {
			console.error('Error al actualizar el tema:', error);
			setUpdateSuccess(false);
		}
	};

	const handleSingleCheckboxChange = (
		themeId: string,
		checked: boolean,
		themeName: string,
		isFree: boolean
	): void => {
		if (checked === true) {
			setSelectedTheme(themeName);
			if (isFree === true) {
				void updateTheme(themeName);
			}
		} else {
			setSelectedTheme(null);
			void updateTheme(null);
		}
	};

	return {
		themes,
		loading,
		selectedTheme,
		handleSingleCheckboxChange,
		updateSuccess,
		setUpdateSuccess,
	};
};
