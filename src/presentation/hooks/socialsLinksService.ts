import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';

const API_URL = API_ENDPOINTS.SOCIAL_LINK;

const getDomainFromLocalStorage = (): string => {
	const domain = localStorage.getItem('domainSelect');
	return domain !== null ? domain : '';
};

// Obtener los enlaces sociales
export const fetchSocialLinks = async (): Promise<any[]> => {
	const domain = getDomainFromLocalStorage();
	const response = await fetch(`${API_URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			domain: domain, // Agrega el dominio en el header
		},
	});

	if (response.ok === false) {
		throw new Error('Error al obtener los enlaces sociales');
	}
	const data = (await response.json()) as any[];
	return data;
};

// Agregar un nuevo enlace social
export const addSocialLink = async (newLink: any): Promise<any> => {
	const domain = getDomainFromLocalStorage();
	const response = await fetch(`${API_URL}/new`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			domain: domain, // Agrega el dominio en el header
		},
		body: JSON.stringify(newLink),
	});

	if (response.ok === false) {
		throw new Error('Error al agregar el enlace social');
	}
	return response.json();
};

// Editar un enlace social existente
export const updateSocialLink = async (updatedLink: any): Promise<any> => {
	const domain = getDomainFromLocalStorage();
	const response = await fetch(`${API_URL}/${String(updatedLink._id)}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			domain: domain, // Agrega el dominio en el header
		},
		body: JSON.stringify(updatedLink),
	});

	if (response.ok === false) {
		throw new Error('Error al actualizar el enlace social');
	}
	return response.json();
};

// Eliminar un enlace social
export const deleteSocialLink = async (linkId: string): Promise<any> => {
	const domain = getDomainFromLocalStorage();
	const response = await fetch(`${API_URL}/${linkId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			domain: domain, // Agrega el dominio en el header
		},
	});

	if (response.ok === false) {
		throw new Error('Error al eliminar el enlace social');
	}
	return response.json();
};

// Cambiar el estado activo/inactivo de un enlace social
export const toggleSocialLinkActive = async (linkId: string): Promise<any> => {
	const domain = getDomainFromLocalStorage();
	const response = await fetch(`${API_URL}/${linkId}/toggle`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			domain: domain, // Agrega el dominio en el header
		},
	});

	if (response.ok === false) {
		throw new Error('Error al cambiar el estado del enlace social');
	}
	return response.json();
};

// hooks/socialsLinksService.ts

export const fetchAvailableIcons = (): { key: string; value: string }[] => {
	// Array estático de iconos
	const icons = [
		{ key: 'facebook', value: 'Facebook' },
		{ key: 'ex', value: 'X' },
		{ key: 'instagram', value: 'Instagram' },
		{ key: 'linkedin', value: 'LinkedIn' },
		{ key: 'tiktok', value: 'TikTok' },
		{ key: 'youtube', value: 'Youtube' },
		// Agrega más iconos según sea necesario
	];
	return icons; // Retorna el array de iconos
};
