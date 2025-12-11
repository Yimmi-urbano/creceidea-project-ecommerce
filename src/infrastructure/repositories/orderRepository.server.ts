/**
 * Order Repository - Server Side
 * 
 * Server-side order data operations for Server Components and Server Actions.
 * Uses fetch API with Next.js cache configuration.
 * 
 * @module orderRepository.server
 */

'use server'

import { serverGet, serverPatch } from '@/src/infrastructure/http/serverApiClient';
import { API_ENDPOINTS } from '@/src/infrastructure/http/apiConfig';
import { Order } from '@/src/domain/orders/Order';

/**
 * Fetch all orders (server-side)
 * 
 * @param revalidate - Cache revalidation time in seconds
 * @returns Promise with orders array
 */
export async function fetchOrders(revalidate: number = 30): Promise<Order[]> {
    return serverGet<Order[]>(API_ENDPOINTS.ORDERS, {
        revalidate,
        tags: ['orders'],
    });
}

/**
 * Fetch order by ID (server-side)
 * 
 * @param orderId - Order ID
 * @param revalidate - Cache revalidation time
 * @returns Promise with order data
 */
export async function fetchOrderById(
    orderId: string,
    revalidate: number = 30
): Promise<Order> {
    return serverGet<Order>(`${API_ENDPOINTS.ORDER_BY_ID}/${orderId}`, {
        revalidate,
        tags: ['orders', `order-${orderId}`],
    });
}

/**
 * Update order status (server action)
 * 
 * @param orderId - Order ID
 * @param status - New status
 * @returns Promise with updated order
 */
export async function updateOrderStatus(
    orderId: string,
    status: string
): Promise<Order> {
    return serverPatch<Order>(`${API_ENDPOINTS.ORDERS}/${orderId}/status`, {
        status,
    });
}

/**
 * Update payment status (server action)
 * 
 * @param orderId - Order ID
 * @param status - Payment status
 * @param paymentMethod - Payment method
 * @returns Promise with updated order
 */
export async function updatePaymentStatus(
    orderId: string,
    status: string,
    paymentMethod: string
): Promise<Order> {
    return serverPatch<Order>(`${API_ENDPOINTS.ORDERS}/${orderId}/payment`, {
        status,
        paymentMethod,
    });
}
