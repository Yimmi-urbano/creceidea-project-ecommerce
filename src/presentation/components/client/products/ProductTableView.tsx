'use client';

import React from 'react';
import { useProductContext } from '@/src/presentation/contexts';
import { useRouter } from 'next/navigation';
import { Edit3, Trash2 } from 'lucide-react';
import { Badge } from '@/src/presentation/components/shared/Badge';
import { IconButton } from '@/src/presentation/components/shared/IconButton';
import { Image, Spinner } from '@nextui-org/react';

interface ProductTableViewProps {
    searchTerm?: string;
}

export const ProductTableView: React.FC<ProductTableViewProps> = ({ searchTerm = '' }) => {
    const { products, isLoading } = useProductContext();
    const router = useRouter();

    const filteredProducts = products?.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleEdit = (id: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedCardId', id);
        }
        router.push('/dashboard/products/edit');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <Image className="w-16 h-16" src="/espera.gif" alt="No products" />
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 text-center mt-4">
                    {searchTerm ? 'No se encontraron productos' : 'Aún no has agregado productos a tu tienda.'}
                    <br />
                    {!searchTerm && '¡Empieza a agregar productos y expande tu catálogo!'}
                </p>
            </div>
        );
    }

    return (
        <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase font-semibold bg-zinc-50 dark:bg-dark-bg text-zinc-500 dark:text-zinc-400">
                <tr>
                    <th className="px-6 py-4">Producto</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredProducts.map((product: any) => (
                    <tr key={product._id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4">
                            <img
                                src={product.image_default?.[0] || '/placeholder-product.png'}
                                className="w-10 h-10 rounded-lg object-cover"
                                alt={product.title}
                            />
                            <span className="font-medium text-zinc-900 dark:text-zinc-200">
                                {product.title}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <Badge status={product.status || 'draft'} />
                        </td>
                        <td className="px-6 py-4 font-medium">
                            {product.price?.sale > 0 && product.price.sale !== product.price.regular ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs line-through text-zinc-400 dark:text-zinc-500">
                                        S/ {product.price.regular.toFixed(2)}
                                    </span>
                                    <span className="text-sm font-bold text-primary">
                                        S/ {product.price.sale.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-sm font-medium">
                                    S/ {product.price?.regular?.toFixed(2) || '0.00'}
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <IconButton icon={Edit3} onClick={() => handleEdit(product._id)} />
                                <IconButton icon={Trash2} variant="danger" />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
