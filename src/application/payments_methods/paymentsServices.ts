import { fetchPayment, createPayment, updatePayment } from "@/src/infrastructure/repositories/paymentRepository";
import { Payment } from "@/src/domain/payments_methods/Payment";

export const getPayment = async (nameId: string): Promise<Payment | null> => {
  return await fetchPayment(nameId);
};

export const addPayment = async (payment: Payment): Promise<Payment | null> => {
  return await createPayment(payment);
};

export const editPayment = async (id: string, payment: Payment): Promise<Payment | null> => {
  return await updatePayment(id, payment);
};
