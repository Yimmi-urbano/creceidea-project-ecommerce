import { useState, useEffect } from "react";
import { getOrderById } from "@/src/application/orders/orderServices";
import { Order } from "@/src/domain/orders/Order";

const useOrderDetails = (orderId: string) => {
  const [orderData, setOrderData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrderData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      getOrderDetails();
    }
  }, [orderId]);

  return { orderData, loading, error };
};

export default useOrderDetails;
