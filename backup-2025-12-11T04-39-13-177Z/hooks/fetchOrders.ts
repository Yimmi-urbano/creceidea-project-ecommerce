
export interface Product {
  id: string;
  title: string;
  image: string;
  qty: number;
  valid_price: number;
}

export interface OrderData {
  _id: string;
  domain: string;
  products: Product[];
  clientInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  total: number;
  currency: string;
  orderNumber: string;
  orderStatus: {
    typeStatus: string;
    message: string;
    date: string;
  };
  createdAt: string;
}


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
  const domain = localStorage.getItem("domainSelect") ?? '';

  const myHeaders = new Headers();
  myHeaders.append("domain", domain);
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
  const domain = localStorage.getItem("domainSelect") ?? '';

  const myHeaders = new Headers();
  myHeaders.append("domain", domain);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    typeStatus: status,
    message: `El pago fue actualizado a ${status}`,
    methodPayment: paymentMethod,
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


export const fetchOrderDetails = async (orderId: string): Promise<OrderData> => {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const myHeaders = new Headers();
  myHeaders.append("domain", domain);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const response = await fetch(
    `https://api-orders.creceidea.pe/api/orders/id/${orderId}`,
    requestOptions
  );

  if (!response.ok) {
    throw new Error("Error al obtener los detalles del pedido.");
  }

  return await response.json();
};
