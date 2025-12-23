import { useEffect, useState } from 'react';

import { getOrderById } from '@/src/application/orders/orderServices';
import { Order } from '@/src/domain/orders/Order';

const useOrderDetails = (
	orderId: string
): {
	orderData: Order | null;
	loading: boolean;
	error: string | null;
} => {
	const [orderData, setOrderData] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getOrderDetails = async (): Promise<void> => {
			try {
				setLoading(true);
				const data = await getOrderById(orderId);
				setOrderData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Error al obtener detalles de la orden');
			} finally {
				setLoading(false);
			}
		};

		if (orderId !== '') {
			void getOrderDetails();
		}
	}, [orderId]);

	return { orderData, loading, error };
};

export default useOrderDetails;
