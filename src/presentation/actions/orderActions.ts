/**
 * Order Server Actions
 * 
 * Next.js Server Actions for order operations.
 * 
 * @module orderActions
 */

'use server'

import { revalidatePath } from 'next/cache';
import * as orderServices from '@/src/application/orders/orderServices.server';
import { OrderStatus } from '@/src/domain/orders/Order';

/**
 * Update order status action
 * 
 * @param orderId - Order ID
 * @param status - New order status
 * @returns Updated order
 */
export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
    try {
        const order = await orderServices.updateOrderStatus(orderId, status);

        // Revalidate order pages
        revalidatePath('/dashboard/orders');
        revalidatePath(`/dashboard/orders/${orderId}`);

        return { success: true, data: order };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error updating order status',
        };
    }
}

/**
 * Update payment status action
 * 
 * @param orderId - Order ID
 * @param status - Payment status
 * @param paymentMethod - Payment method
 * @returns Updated order
 */
export async function updatePaymentStatusAction(
    orderId: string,
    status: 'pending' | 'paid' | 'failed' | 'refunded',
    paymentMethod: string
) {
    try {
        const order = await orderServices.updatePaymentStatus(orderId, status, paymentMethod);

        // Revalidate order pages
        revalidatePath('/dashboard/orders');
        revalidatePath(`/dashboard/orders/${orderId}`);

        return { success: true, data: order };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error updating payment status',
        };
    }
}
