/**
 * Order Repository
 *
 * Handles all order-related data operations.
 * Communicates with the orders API.
 *
 * @module orderRepository
 */

import { Order } from '@/src/domain/orders/Order';
import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';

/**
 * Transform API response to Order domain model
 * The API uses different field names than our domain model
 */
const transformApiOrder = (apiOrder: any): Order => {
	return {
		_id: apiOrder._id,
		orderNumber: apiOrder.orderNumber,
		status: apiOrder.orderStatus?.typeStatus || 'pending',
		customer: {
			name: apiOrder.clientInfo?.first_name || apiOrder.clientInfo?.name || '',
			email: apiOrder.clientInfo?.email || '',
			phone: apiOrder.clientInfo?.phone || '',
			document: apiOrder.clientInfo?.document,
		},
		products: (apiOrder.products || []).map((product: any) => ({
			_id: product.id || product._id,
			title: product.title,
			image: product.image,
			quantity: product.qty || product.quantity || 1,
			price: product.valid_price || product.price || 0,
			total: (product.qty || product.quantity || 1) * (product.valid_price || product.price || 0),
			variation: product.variation,
		})),
		subtotal: apiOrder.subtotal || apiOrder.total || 0,
		tax: apiOrder.tax || 0,
		shippingCost: apiOrder.shippingCost || 0,
		total: apiOrder.total || 0,
		payment: {
			method:
				apiOrder.paymentStatus?.methodPayment || apiOrder.paymentStatus?.method || 'credit_card',
			status: apiOrder.paymentStatus?.typeStatus || 'pending',
			transactionId: apiOrder.paymentStatus?.transactionId,
			paidAt: apiOrder.paymentStatus?.date,
		},
		shippingAddress: apiOrder.shippingAddress,
		notes: apiOrder.notes,
		createdAt: apiOrder.createdAt,
		updatedAt: apiOrder.updatedAt || apiOrder.createdAt,
		deliveredAt: apiOrder.deliveredAt,
	} as Order;
};

/**
 * Fetch all orders
 *
 * @returns Promise with orders array
 */
export const fetchOrders = async (): Promise<Order[]> => {
	try {
		const response = await apiClient.get(API_ENDPOINTS.ORDERS);
		const rawOrders = response.data.data;
		if (!Array.isArray(rawOrders)) {
			console.error('❌ API did not return an array:', rawOrders);
			return [];
		}

		// Transform API data to domain model
		return rawOrders.map(transformApiOrder);
	} catch (error) {
		console.error('❌ Error fetching orders:', error);
		throw error;
	}
};

/**
 * Fetch order details by ID
 *
 * @param orderId - Order ID
 * @returns Promise with order data
 */
export const fetchOrderById = async (orderId: string): Promise<Order> => {
	const response = await apiClient.get(`${API_ENDPOINTS.ORDER_BY_ID}/${orderId}`);
	return transformApiOrder(response.data);
};

/**
 * Update order status
 *
 * @param orderId - Order ID
 * @param status - New order status
 * @returns Promise with updated order
 */
export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
	const response = await apiClient.put(
		`https://api-orders.creceidea.pe/api/orders/${orderId}/order-status`,
		{
			typeStatus: status,
			message: `Estado de la orden actualizado a ${status}`,
			date: new Date().toISOString(),
		}
	);
	return transformApiOrder(response.data);
};

/**
 * Update payment status
 *
 * @param orderId - Order ID
 * @param status - Payment status
 * @param paymentMethod - Payment method
 * @returns Promise with updated order
 */
export const updatePaymentStatus = async (
	orderId: string,
	status: string,
	paymentMethod: string
): Promise<Order> => {
	const response = await apiClient.put(
		`https://api-orders.creceidea.pe/api/orders/${orderId}/payment-status`,
		{
			typeStatus: status,
			message: `El pago fue actualizado a ${status}`,
			methodPayment: paymentMethod,
		}
	);
	return transformApiOrder(response.data);
};
