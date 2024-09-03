export interface SeoMetadata {
    meta_description: string;
    meta_keyword: string;
    title: string;
    slogan: string;
  }

  const getDomainFromLocalStorage = (): string => {
    const domain = localStorage.getItem('domainSelect');
    return domain ? domain.split('.')[0] : '';
  };
  
  export async function updateSeoMetadata(updatedData: SeoMetadata): Promise<SeoMetadata> {
    const domain = getDomainFromLocalStorage();
    const response = await fetch('https://api-configuration.creceidea.pe/api/config/metadata', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'domain': domain,
      },
      body: JSON.stringify(updatedData),
    });
  
    if (!response.ok) {
      throw new Error('Error updating metadata');
    }
  
    return response.json();
  }
  