import React, { useState, useEffect } from 'react';
import { fetchOrdersFromAPI } from '@/hooks/fetchOrders';

interface Order {
  _id: string;
  orderNumber: string;
  paymentStatus: { typeStatus: string, date: string };
  total: number;
  currency: string;
  createdAt: string;
  clientInfo: { name: string };
}

export const useFetchOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await fetchOrdersFromAPI();
        setOrders(orders.data || []);
      } catch (err: any) {
        setError(err.message || 'Error desconocido.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrdersInState = async () => {
    const orders = await fetchOrdersFromAPI();
    setOrders(orders.data || []);
  };

  return { orders, loading, error, updateOrdersInState };
};
