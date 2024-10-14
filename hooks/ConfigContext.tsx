import React, { createContext, useContext, useEffect, useState } from 'react';

interface ConfigData {
  logo: string;
  meta_description?: string;
  meta_keyword?: string;
  title?: string;
  slogan?: string;
  theme?:String;
  catalogo?: {
    button: {
      text: string;
      action: string;
      color_bg: string;
      color_text: string;
    };
    whatsapp: {
      number: string;
    };
    currency: {
      code: string;
      symbol: string;
    };
  };
  integrations?:[]
}

interface ConfigContextType {
  config: ConfigData | null;
  loading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

const getDomainFromLocalStorage = (): string => {
  const domain = localStorage.getItem('domainSelect');
  return domain ? domain : '';
};

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const domain = getDomainFromLocalStorage();
        const response = await fetch('https://api-configuration.creceidea.pe/api/configurations', {
          headers: { domain: domain },
        });
        const data = await response.json();
        setConfig(data[0]);
      } catch (error) {
        console.error('Error fetching config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};
