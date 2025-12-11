/**
 * Server Actions - Barrel Export
 * 
 * Centralized exports for all Server Actions.
 * Located in presentation layer as they handle UI interactions.
 * 
 * @module presentation/actions
 */

// Product actions
export {
    createProductAction,
    updateProductAction,
    deleteProductAction,
    updateProductOrderAction,
} from './productActions';

// Category actions
export {
    createCategoryAction,
    updateCategoryAction,
    deleteCategoryAction,
} from './categoryActions';

// Order actions
export {
    updateOrderStatusAction,
    updatePaymentStatusAction,
} from './orderActions';

// Banner actions
export {
    deleteBannerAction,
    revalidateBannersAction,
} from './bannerActions';
