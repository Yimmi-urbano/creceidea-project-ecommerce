import { WooCommerceProduct } from '@/hooks/woocommerce/formatData';

export async function addProductToWooCommerce(
    woocommerceUrl: string,
    consumerKey: string,
    consumerSecret: string,
    productData: WooCommerceProduct
) {
    const url = `${woocommerceUrl}/wp-json/wc/v3/products`;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Error al agregar el producto a WooCommerce');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}
