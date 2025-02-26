import React, { useState, useEffect } from 'react';
import { Button, CardBody, Card, Link } from '@nextui-org/react';
import { ProductIcon, EyeIcon } from './icons'; // Asegúrate de que estos iconos están correctamente definidos
import withPermission from "./withPermission";

interface Product {
  name: string;
  image: string;
  sales: number;
  inStock: boolean;
  slug: string;
}

const sampleProduct: Product = {
  name: "Audífonos Inalámbricos",
  image: "https://cdn.shopify.com/static/sample-images/garnished.jpeg?v=1571709138",
  sales: 120,
  slug: '/',
  inStock: true
};

const TopProductComponent: React.FC = () => {
  const [product, setProduct] = useState<Product>(sampleProduct);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  
    const domain = typeof window !== "undefined" ? localStorage.getItem("domainSelect") ?? '' : '';

    if (!domain) {
      console.warn("No se encontró un dominio en localStorage");
      setLoading(false);
      return;
    }

    fetch('https://api-orders.creceidea.pe/api/orders/product/top-selling-product', {
      headers: { domain }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status && data.data) {
          setProduct({
            name: data.data.name,
            image: data.data.image,
            sales: data.data.totalSold,
            slug: 'https://'+domain+'/product/'+data.data.slug,
            inStock: true
          });
        }
      })
      .catch(err => console.error('Error al obtener el producto más vendido:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card isBlurred className="flex border-1 border-[#B8F1D2] bg-[#53B48399] dark:bg-[#2F946199]/60 dark:border-[#53B483] max-w-[610px]">
      <CardBody>
        <div className="text-white flex flex-col items-center">
          <h2 className="text-sm font-bold mb-1 mt-1">Producto más vendido</h2>

          {loading ? (
            <p className="text-sm">Cargando...</p>
          ) : (
            <>
              <div className="flex items-center justify-center w-full mb-5 mt-5">
                <img src={product.image} alt={product.name} className="w-20 h-[60px] object-cover rounded-xl" />
                <div className="flex flex-col ml-4">
                  <p className="text-sm">{product.sales} Ventas</p>
                  <div className="flex items-center mt-2">
                    <ProductIcon />
                    <span className="ml-1 text-sm">En stock</span>
                  </div>
                </div>
              </div>

              <Button as={Link} href={product.slug} type="submit" target='_blank' size="sm" variant='solid' endContent={<EyeIcon />} className="bg-white text-black m-auto block w-[80%] flex rounded-3xl">
                Ver producto
              </Button>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default withPermission(TopProductComponent, 'topproduct');
