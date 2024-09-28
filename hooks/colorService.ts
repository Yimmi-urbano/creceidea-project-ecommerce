const getDomainFromLocalStorage = (): string => {
  const domain = localStorage.getItem('domainSelect');
  return domain ? domain: '';
};

export const updateColors = async (colors: string[]) => {
  const domain = getDomainFromLocalStorage()
    try {
      const response = await fetch('https://api-configuration.creceidea.pe/api/config/colors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'domain': domain,
        },
        body: JSON.stringify({ colors }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update colors');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating colors:', error);
      throw error;
    }
  };
  