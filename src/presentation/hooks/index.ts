/**
 * Presentation Hooks - Barrel Export
 * 
 * Centralized exports for all presentation hooks.
 * Simplifies imports throughout the application.
 * 
 * @module hooks
 */

// Product hooks
export {
    useProducts,
    useProduct,
    useProductMutations,
} from './products/useProducts';

// Category hooks
export { useCategories } from './categories/useCategories';

// Order hooks
export { useOrders, useOrderDetails as useOrderDetailsList } from './orders/useOrders';
export { default as useIsOrders } from './orders/useIsOrders';
export { default as useOrderDetails } from './orders/useOrderDetails';

// Banner hooks
export { useBanners, useBanner } from './banners/useBanners';

// Configuration hooks
export { useThemes } from './configuration/useThemes';
export { default as useUpdateCatalog } from './configuration/useUpdateCatalog';
export { updateWhatsappHome } from './configuration/useWhatsappHome';

// UI hooks
export { default as useResizableSidebar } from './ui/useResizableSidebar';
export { default as useIsMobile } from './ui/useIsMobile';
