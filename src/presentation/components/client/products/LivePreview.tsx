import React from 'react';
import { Card, CardBody, Image, Chip } from "@nextui-org/react";

interface LivePreviewProps {
    name: string;
    description: string;
    price: number | string;
    salePrice?: number | string;
    imageUrl?: string;
    loading?: boolean;
}

const LivePreview: React.FC<LivePreviewProps> = ({
    name,
    description,
    price,
    salePrice,
    imageUrl,
    loading = false
}) => {
    // Format price to currency
    const formatPrice = (val: number | string) => {
        const num = Number(val);
        return isNaN(num) ? '0.00' : num.toFixed(2);
    };

    const regularPriceNum = Number(price);
    const salePriceNum = Number(salePrice);
    const hasDiscount = salePriceNum > 0 && salePriceNum < regularPriceNum;

    return (
        <Card className="w-full bg-white dark:bg-[#13161c] shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">
                Vista Previa en Tienda
            </div>

            <CardBody className="p-0">
                {/* Image Area */}
                <div className="relative aspect-[4/3] w-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex items-center justify-center">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={name || "Producto"}
                            classNames={{
                                img: "w-full h-full object-cover",
                                wrapper: "w-full h-full"
                            }}
                            radius="none"
                        />
                    ) : (
                        <div className="text-zinc-300 dark:text-zinc-700 font-medium flex flex-col items-center">
                            <span className="text-4xl text-zinc-200 dark:text-zinc-800 mb-2">🖼️</span>
                            <span>Sin Imagen</span>
                        </div>
                    )}

                    {hasDiscount && (
                        <div className="absolute top-3 right-3 z-10">
                            <Chip color="danger" variant="solid" size="sm" className="font-bold shadow-sm">
                                ¡OFERTA!
                            </Chip>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="p-5 space-y-4">
                    {/* Title */}
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-2">
                            {name || "Nombre del Producto"}
                        </h3>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        {hasDiscount ? (
                            <>
                                <span className="text-2xl font-black text-primary">
                                    S/ {formatPrice(salePriceNum)}
                                </span>
                                <span className="text-sm text-zinc-400 line-through decoration-zinc-400">
                                    S/ {formatPrice(regularPriceNum)}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                                S/ {formatPrice(regularPriceNum)}
                            </span>
                        )}
                    </div>

                    {/* Description Snippet */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {description || "Aquí aparecerá la descripción corta del producto..."}
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default LivePreview;
