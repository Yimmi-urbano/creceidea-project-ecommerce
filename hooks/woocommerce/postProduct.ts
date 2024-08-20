import { WooCommerceProduct } from '@/hooks/woocommerce/formatData';
import { addProductToWooCommerce } from '@/hooks/woocommerce/addProductToWooCommerce';

export const addProductToWooCommerceService = async (productData: any) => {
    const wooCommerceProductData: WooCommerceProduct = {
        name: productData.title,
        type: 'simple',
        regular_price: productData.price['regular'].toString(),
        description: productData.description_short,
        short_description: productData.description_short,
        categories: productData.category_id ? [{ id: productData.category_id }] : undefined,
        images: productData.image_default.map((imageUrl: string) => ({
            src: imageUrl,
        })),
    };

    const woocommerceUrl = 'https://preselectivasjuvenilesparaargentina.store/';
    const consumerKey = 'ck_0ea2863a10a77bef7e59fded5b4f5f26fa65e8e5';
    const consumerSecret = 'cs_69ef4c7ba526eae4ef71c484ee7552bc34777adf';

    return await addProductToWooCommerce(
        woocommerceUrl,
        consumerKey,
        consumerSecret,
        wooCommerceProductData
    );
};
