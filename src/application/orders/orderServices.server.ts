/**
 * Order Application Services - Server Side
 * 
 * Server-side business logic for orders.
 * 
 * @module orderServices.server
 */

'use server'

import * as orderRepo from '@/src/infrastructure/repositories/orderRepository.server';
import { Order, OrderStatus } from '@/src/domain/orders/Order';
import { revalidateTag } from 'next/cache';

/**
 * Get all orders (server-side)
 * 
 * @param revalidate - Cache time
 * @returns Promise with orders
 */
export async function getOrders(revalidate: number = 30): Promise<Order[]> {
    return orderRepo.fetchOrders(revalidate);
}

/**
 * Get order by ID (server-side)
 * 
 * @param orderId - Order ID
 * @param revalidate - Cache time
 * @returns Promise with order
 */
export async function getOrderById(
    orderId: string,
    revalidate: number = 30
): Promise<Order> {
    return orderRepo.fetchOrderById(orderId, revalidate);
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
    status: OrderStatus
): Promise<Order> {
    const validStatuses: OrderStatus[] = [
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
    ];

    if (!validStatuses.includes(status)) {
        throw new Error('Invalid order status');
    }

    const order = await orderRepo.updateOrderStatus(orderId, status);

    // Revalidate cache
    revalidateTag('orders');
    revalidateTag(`order-${orderId}`);

    return order;
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
    status: 'pending' | 'paid' | 'failed' | 'refunded',
    paymentMethod: string
): Promise<Order> {
    const validStatuses = ['pending', 'paid', 'failed', 'refunded'];

    if (!validStatuses.includes(status)) {
        throw new Error('Invalid payment status');
    }

    if (!paymentMethod || paymentMethod.trim().length === 0) {
        throw new Error('Payment method is required');
    }

    const order = await orderRepo.updatePaymentStatus(orderId, status, paymentMethod);

    // Revalidate cache
    revalidateTag('orders');
    revalidateTag(`order-${orderId}`);

    return order;
}
