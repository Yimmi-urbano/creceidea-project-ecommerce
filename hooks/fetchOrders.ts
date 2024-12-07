export const fetchOrdersFromAPI = async () => {
    const domain = localStorage.getItem("domainSelect") ?? '';
    const domainPrimary = domain;

    if (!domain) {
      throw new Error('El dominio no está configurado en localStorage.');
    }
  
    const response = await fetch('https://api-orders.creceidea.pe/api/orders/list', {
      method: 'GET',
      headers: {
        'domain': domainPrimary,
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al obtener las órdenes.');
    }
  
    return await response.json();
  };
  
  export const updateOrderStatus = async (orderId: string, status: string) => {
    const myHeaders = new Headers();
    myHeaders.append("domain", "donguston.creceidea.pe");
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      typeStatus: status,
      message: `Estado de la orden actualizado a ${status}`,
      date: new Date().toISOString()
    });
  
    try {
      const response = await fetch(`https://api-orders.creceidea.pe/api/orders/${orderId}/order-status`, {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el estado de la orden: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error("Error en actualizar el estado de la orden:", error.message);
      throw new Error(`Error al actualizar el estado de la orden: ${error.message}`);
    }
  };
  
  export const updatePaymentStatus = async (orderId: string, status: string, paymentMethod: string) => {
    const myHeaders = new Headers();
    myHeaders.append("domain", "donguston.creceidea.pe");
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      typeStatus: status,
      message: `El pago fue actualizado a ${status}`,
      data: "Transacción exitosa",
      methodPayment: "credit_card",
      date: new Date().toISOString()
    });
  
    try {
      const response = await fetch(`https://api-orders.creceidea.pe/api/orders/${orderId}/payment-status`, {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el estado de pago: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error("Error en actualizar el estado de pago:", error.message);
      throw new Error(`Error al actualizar el estado de pago: ${error.message}`);
    }
  };
  
  