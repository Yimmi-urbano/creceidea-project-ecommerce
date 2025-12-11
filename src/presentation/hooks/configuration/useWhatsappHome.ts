const API_URL_CONFIGURATION = process.env.NEXT_PUBLIC_CONFIGURATION;

export interface WhatsappHome {
    number: string;
    message_custom: string;
    isActive: boolean;
  }
  

  export const updateWhatsappHome = async (data: WhatsappHome): Promise<boolean> => {
    const domain = localStorage.getItem('domainSelect');
    try {
      const response = await fetch(`${API_URL_CONFIGURATION}/config/home/whatsapp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          domain: domain || '',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error("Error al actualizar WhatsApp Home");
  
      return true;
    } catch (error) {
      console.error("Error al actualizar WhatsApp Home:", error);
      return false;
    }
  };
  