'use client';

import React from 'react';
import { useProductContext } from '@/src/presentation/contexts';
import { useRouter } from 'next/navigation';
import { Edit3, Trash2 } from 'lucide-react';
import { Badge } from '@/src/presentation/components/shared/Badge';
import { Image, Spinner } from '@nextui-org/react';

interface ProductGridViewProps {
    searchTerm?: string;
}

export const ProductGridView: React.FC<ProductGridViewProps> = ({ searchTerm = '' }) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
                <div
                    key={product._id}
                    className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white dark:bg-dark-card border-zinc-200/60 dark:border-zinc-800/50 hover:border-primary/30 hover:shadow-zinc-200/50 dark:hover:shadow-primary/10"
                >
                    {/* Image Container */}
                    <div className="aspect-[4/3] w-full relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <img
                            src={product.image_default?.[0] || '/placeholder-product.png'}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Hover Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <button
                                onClick={() => handleEdit(product._id)}
                                className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-primary shadow-sm transition-colors"
                            >
                                <Edit3 size={16} />
                            </button>
                            <button
                                className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-rose-500 shadow-sm transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {/* Discount Badge */}
                        {product.price?.sale > 0 && product.price.sale !== product.price.regular && (
                            <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                                OFERTA
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                                <p className="text-xs text-zinc-500 mb-1">
                                    {product.category?.title || 'Sin categoría'}
                                </p>
                                <h3 className="font-semibold text-base truncate pr-2">
                                    {product.title}
                                </h3>
                            </div>
                        </div>

                        {/* Price and Status */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex flex-col">
                                {product.price?.sale > 0 && product.price.sale !== product.price.regular ? (
                                    <>
                                        <span className="text-xs text-zinc-400 line-through">
                                            S/ {product.price.regular.toFixed(2)}
                                        </span>
                                        <span className="text-lg font-bold text-primary">
                                            S/ {product.price.sale.toFixed(2)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                        S/ {product.price?.regular?.toFixed(2) || '0.00'}
                                    </span>
                                )}
                            </div>
                            <Badge status={product.status || 'draft'} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
