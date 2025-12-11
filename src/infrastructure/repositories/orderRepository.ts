/**
 * Order Repository
 * 
 * Handles all order-related data operations.
 * Communicates with the orders API.
 * 
 * @module orderRepository
 */

import apiClient from '@/src/infrastructure/http/apiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { Order, OrderFilters } from '@/src/domain/orders/Order';

/**
 * Fetch all orders
 * 
 * @returns Promise with orders array
 */
export const fetchOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get(API_ENDPOINTS.ORDERS);
    return response.data;
};

/**
 * Fetch order details by ID
 * 
 * @param orderId - Order ID
 * @returns Promise with order data
 */
export const fetchOrderById = async (orderId: string): Promise<Order> => {
    const response = await apiClient.get(`${API_ENDPOINTS.ORDER_BY_ID}/${orderId}`);
    return response.data;
};

/**
 * Update order status
 * 
 * @param orderId - Order ID
 * @param status - New order status
 * @returns Promise with updated order
 */
export const updateOrderStatus = async (
    orderId: string,
    status: string
): Promise<Order> => {
    const response = await apiClient.patch(`${API_ENDPOINTS.ORDERS}/${orderId}/status`, {
        status,
    });
    return response.data;
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
    const response = await apiClient.patch(`${API_ENDPOINTS.ORDERS}/${orderId}/payment`, {
        status,
        paymentMethod,
    });
    return response.data;
};
