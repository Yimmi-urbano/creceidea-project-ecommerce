import React, { useState, useEffect } from 'react';
import { getOrders } from '@/src/application/orders/orderServices';
import { Order } from '@/src/domain/orders/Order';

const useIsOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        // Ensure we always set an array
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err: any) {
        setError(err.message || 'Error desconocido.');
        setOrders([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const refreshOrders = async () => {
    setLoading(true);
    try {
      const ordersData = await getOrders();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err: any) {
      setError(err.message || 'Error desconocido.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refreshOrders };
};

export default useIsOrders;
