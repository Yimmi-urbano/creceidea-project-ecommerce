import { useState, useEffect } from "react";
import { fetchOrderDetails, OrderData } from "@/hooks/fetchOrders";

const useOrderDetails = (orderId: string) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderDetails(orderId);
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
