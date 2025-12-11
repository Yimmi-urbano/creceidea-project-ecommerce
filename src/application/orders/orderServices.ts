/**
 * Order Application Services
 * 
 * Business logic layer for order operations.
 * 
 * @module orderServices
 */

import * as orderRepo from '@/src/infrastructure/repositories/orderRepository';
import { Order, OrderStatus } from '@/src/domain/orders/Order';

/**
 * Get all orders
 * 
 * @returns Promise with orders array
 */
export const getOrders = async (): Promise<Order[]> => {
    return orderRepo.fetchOrders();
};

/**
 * Get order by ID
 * 
 * @param orderId - Order ID
 * @returns Promise with order
 */
export const getOrderById = async (orderId: string): Promise<Order> => {
    return orderRepo.fetchOrderById(orderId);
};

/**
 * Update order status
 * Validates status transition
 * 
 * @param orderId - Order ID
 * @param status - New status
 * @returns Promise with updated order
 */
export const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus
): Promise<Order> => {
    // Business logic: validate status
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

    return orderRepo.updateOrderStatus(orderId, status);
};

/**
 * Update payment status
 * Validates payment status
 * 
 * @param orderId - Order ID
 * @param status - Payment status
 * @param paymentMethod - Payment method
 * @returns Promise with updated order
 */
export const updatePaymentStatus = async (
    orderId: string,
    status: 'pending' | 'paid' | 'failed' | 'refunded',
    paymentMethod: string
): Promise<Order> => {
    // Business logic: validate payment status
    const validStatuses = ['pending', 'paid', 'failed', 'refunded'];

    if (!validStatuses.includes(status)) {
        throw new Error('Invalid payment status');
    }

    if (!paymentMethod || paymentMethod.trim().length === 0) {
        throw new Error('Payment method is required');
    }

    return orderRepo.updatePaymentStatus(orderId, status, paymentMethod);
};

/**
 * Calculate order statistics
 * Business logic for order analytics
 * 
 * @param orders - Orders array
 * @returns Order statistics
 */
export const calculateOrderStats = (orders: Order[]) => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders,
        averageOrderValue,
    };
};
