/**
 * Orders Hook
 *
 * Custom hook for order operations.
 * Uses order services for data fetching and mutations.
 *
 * @module useOrders
 */

'use client';

import { useEffect, useState } from 'react';

import * as orderServices from '@/src/application/orders/orderServices';
import { Order, OrderStatus } from '@/src/domain/orders/Order';

/**
 * Hook for managing orders
 *
 * @returns Order data and operations
 */
export const useOrders = (): {
	orders: Order[];
	stats: any;
	loading: boolean;
	error: string | null;
	updateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
	updatePayment: (
		orderId: string,
		status: 'pending' | 'paid' | 'failed' | 'refunded',
		paymentMethod: string
	) => Promise<void>;
	refresh: () => Promise<void>;
} => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [stats, setStats] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fetch all orders
	 */
	const fetchOrders = async (): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			const data = await orderServices.getOrders();
			setOrders(data);

			// Calculate statistics
			const statistics = orderServices.calculateOrderStats(data);
			setStats(statistics);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error fetching orders');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Update order status
	 */
	const updateStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			await orderServices.updateOrderStatus(orderId, status);
			await fetchOrders(); // Refresh list
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error updating order status';
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Update payment status
	 */
	const updatePayment = async (
		orderId: string,
		status: 'pending' | 'paid' | 'failed' | 'refunded',
		paymentMethod: string
	): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			await orderServices.updatePaymentStatus(orderId, status, paymentMethod);
			await fetchOrders(); // Refresh list
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error updating payment status';
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		void fetchOrders();
	}, []);

	return {
		orders,
		stats,
		loading,
		error,
		updateStatus,
		updatePayment,
		refresh: fetchOrders,
	};
};

/**
 * Hook for single order details
 *
 * @param orderId - Order ID
 * @returns Order data and loading state
 */
export const useOrderDetails = (
	orderId: string
): {
	order: Order | null;
	loading: boolean;
	error: string | null;
} => {
	const [order, setOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrder = async (): Promise<void> => {
			setLoading(true);
			setError(null);

			try {
				const data = await orderServices.getOrderById(orderId);
				setOrder(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Error fetching order');
			} finally {
				setLoading(false);
			}
		};

		if (orderId !== '') {
			void fetchOrder();
		}
	}, [orderId]);

	return { order, loading, error };
};
