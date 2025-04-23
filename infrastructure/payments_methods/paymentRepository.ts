import { getDomainFromLocalStorage } from "@/config/utils";
import { Payment } from "@/domain/payments_methods/Payment";

const API_URL = "https://api-payment-method.creceidea.pe/api/payments";
const DOMAIN = getDomainFromLocalStorage();

const getHeaders = () => {
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
