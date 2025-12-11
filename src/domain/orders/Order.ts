/**
 * Order Domain Entity
 * 
 * Represents a customer order in the e-commerce system.
 * Contains order details, products, payment, and shipping information.
 * 
 * @module Order
 */

/**
 * Order product item
 */
export interface OrderProduct {
    /** Product ID */
    _id: string;
    /** Product title */
    title: string;
    /** Product image */
    image: string;
    /** Quantity ordered */
    quantity: number;
    /** Unit price */
    price: number;
    /** Total price (quantity * price) */
    total: number;
    /** Selected variation/attributes */
    variation?: string;
}

/**
 * Customer information
 */
export interface OrderCustomer {
    /** Customer name */
    name: string;
    /** Customer email */
    email: string;
    /** Customer phone */
    phone: string;
    /** Customer document/ID */
    document?: string;
}

/**
 * Shipping address
 */
export interface ShippingAddress {
    /** Street address */
    street: string;
    /** City */
    city: string;
    /** State/Province */
    state: string;
    /** Postal code */
    postalCode: string;
    /** Country */
    country: string;
    /** Additional reference */
    reference?: string;
}

/**
 * Payment information
 */
export interface OrderPayment {
    /** Payment method (e.g., "credit_card", "cash") */
    method: string;
    /** Payment status */
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    /** Transaction ID */
    transactionId?: string;
    /** Payment date */
    paidAt?: string;
}

/**
 * Order status type
 */
export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

/**
 * Complete Order entity
 */
export interface Order {
    /** Unique order identifier */
    _id: string;
    /** Order number (human-readable) */
    orderNumber: string;
    /** Order status */
    status: OrderStatus;
    /** Customer information */
    customer: OrderCustomer;
    /** Ordered products */
    products: OrderProduct[];
    /** Subtotal (before tax and shipping) */
    subtotal: number;
    /** Tax amount */
    tax: number;
    /** Shipping cost */
    shippingCost: number;
    /** Total amount */
    total: number;
    /** Payment information */
    payment: OrderPayment;
    /** Shipping address */
    shippingAddress?: ShippingAddress;
    /** Order notes/comments */
    notes?: string;
    /** Created date */
    createdAt: string;
    /** Updated date */
    updatedAt: string;
    /** Delivered date */
    deliveredAt?: string;
}

/**
 * Order filters for search/listing
 */
export interface OrderFilters {
    /** Page number for pagination */
    page: number;
    /** Filter by status */
    status?: OrderStatus;
    /** Filter by payment status */
    paymentStatus?: OrderPayment['status'];
    /** Filter by customer email */
    customerEmail?: string;
    /** Filter by date range (from) */
    dateFrom?: string;
    /** Filter by date range (to) */
    dateTo?: string;
}

/**
 * Order summary (for dashboard/stats)
 */
export interface OrderSummary {
    /** Total orders */
    totalOrders: number;
    /** Total revenue */
    totalRevenue: number;
    /** Pending orders count */
    pendingOrders: number;
    /** Completed orders count */
    completedOrders: number;
    /** Average order value */
    averageOrderValue: number;
}
