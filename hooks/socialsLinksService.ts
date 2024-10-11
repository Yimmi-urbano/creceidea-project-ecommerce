const API_URL = 'https://api-configuration.creceidea.pe/api/social-link'; // Cambia esto a la URL de tu API

const getDomainFromLocalStorage = (): string => {
    const domain = localStorage.getItem('domainSelect');
    return domain ? domain: '';
};

// Obtener los enlaces sociales
export const fetchSocialLinks = async () => {
    const domain = getDomainFromLocalStorage();
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'domain': domain, // Agrega el dominio en el header
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los enlaces sociales');
  }
  return await response.json();
};

// Agregar un nuevo enlace social
export const addSocialLink = async ( newLink: any) => {
    const domain = getDomainFromLocalStorage();
  const response = await fetch(`${API_URL}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'domain': domain, // Agrega el dominio en el header
    },
    body: JSON.stringify(newLink),
  });

  if (!response.ok) {
    throw new Error('Error al agregar el enlace social');
  }
  return await response.json();
};

// Editar un enlace social existente
export const updateSocialLink = async ( updatedLink: any) => {
    const domain = getDomainFromLocalStorage();
    console.log(updatedLink)
  const response = await fetch(`${API_URL}/${updatedLink._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'domain': domain, // Agrega el dominio en el header
    },
    body: JSON.stringify(updatedLink),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el enlace social');
  }
  return await response.json();
};

// Eliminar un enlace social
export const deleteSocialLink = async (linkId: string) => {
    const domain = getDomainFromLocalStorage();
  const response = await fetch(`${API_URL}/${linkId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'domain': domain, // Agrega el dominio en el header
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el enlace social');
  }
  return await response.json();
};

// Cambiar el estado activo/inactivo de un enlace social
export const toggleSocialLinkActive = async (linkId: string) => {
    const domain = getDomainFromLocalStorage();
  const response = await fetch(`${API_URL}/${linkId}/toggle`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'domain': domain, // Agrega el dominio en el header
    },
  });

  if (!response.ok) {
    throw new Error('Error al cambiar el estado del enlace social');
  }
  return await response.json();
};


// hooks/socialsLinksService.ts

export const fetchAvailableIcons = async () => {
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
  