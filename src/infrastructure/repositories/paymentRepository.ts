import { getDomainFromLocalStorage } from "@/src/infrastructure/storage/localStorage";
import { Payment } from "@/src/domain/payments_methods/Payment";
import { API_ENDPOINTS } from "@/src/infrastructure/http/apiConfig";

const API_URL = API_ENDPOINTS.PAYMENT_METHODS;

const getHeaders = () => {

  const DOMAIN = getDomainFromLocalStorage();
  return {
    "Content-Type": "application/json",
    domain: DOMAIN,
  };
};

export const fetchPayment = async (nameId: string): Promise<Payment | null> => {
  try {
    const response = await fetch(`${API_URL}/${nameId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) throw new Error("Error al obtener el método de pago");

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createPayment = async (payment: Payment): Promise<Payment | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payment),
    });

    if (!response.ok) throw new Error("Error al crear el método de pago");

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updatePayment = async (id: string, payment: Payment): Promise<Payment | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payment),
    });

    if (!response.ok) throw new Error("Error al actualizar el método de pago");

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
