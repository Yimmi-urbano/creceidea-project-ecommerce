import { useEffect, useState } from 'react';

import { getOrders } from '@/src/application/orders/orderServices';
import { Order } from '@/src/domain/orders/Order';

const useIsOrders = (): {
	orders: Order[];
	loading: boolean;
	error: string | null;
	refreshOrders: () => Promise<void>;
} => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [_loading, setLoading] = useState(true);
	const [_error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async (): Promise<void> => {
			try {
				const ordersData = await getOrders();
				// Ensure we always set an array
				setOrders(Array.isArray(ordersData) ? ordersData : []);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Error desconocido.';
				setError(errorMessage);
				setOrders([]); // Set empty array on error
			} finally {
				setLoading(false);
			}
		};

		void fetchOrders();
	}, []);

	const refreshOrders = async (): Promise<void> => {
		setLoading(true);
		try {
			const ordersData = await getOrders();
			setOrders(Array.isArray(ordersData) ? ordersData : []);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido.';
			setError(errorMessage);
			setOrders([]);
		} finally {
			setLoading(false);
		}
	};

	return { orders, loading, error, refreshOrders };
};

export default useIsOrders;
