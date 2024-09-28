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

    const woocommerceUrl = 'https://preselectivasjuvenilesparaargentina.store';
    const consumerKey = 'ck_e1e13f5bbe4c63c22970973bb3e0933192772438';
    const consumerSecret = 'cs_f6584ede3aa8991a1b85a0737cf87f52b97fb922';

    return await addProductToWooCommerce(
        woocommerceUrl,
        consumerKey,
        consumerSecret,
        wooCommerceProductData
    );
};
