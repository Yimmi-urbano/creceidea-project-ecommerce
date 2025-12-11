
import React, { useState } from "react";
import { Button, CardHeader, Link } from "@nextui-org/react";
import { useProductContext } from '@/src/presentation/contexts';
import { updateOrderList, } from "@/src/application/products/productServices";
import { SortIcon } from "@/src/presentation/components/shared/icons";

const HeaderProducts: React.FC = () => {
    const { isOrdering, setIsOrdering, orderedProducts, fetchProducts } = useProductContext();

    const handleSaveOrder = async () => {
        const payload = orderedProducts.map((p: any) => ({
            id_product: p._id,
            order: p.order,
        }));

        try {
            await updateOrderList(payload)
        } finally {
            setIsOrdering(false)
            await fetchProducts();
        }
    };

    return (
        <>
            <CardHeader className="bg-transparent flex justify-between">
                <span className="text-xl font-semibold text-gray-600 dark:text-white">Productos</span>
                <div className="flex justify-end gap-3 mb-4">
                    {!isOrdering ? (
                        <Button color="primary" isIconOnly className="text-white" onPress={() => setIsOrdering(true)}>
                            <SortIcon className="rotate-40 text-white" />
                        </Button>
                    ) : (
                        <>
                            <Button color="success" variant="flat" onPress={() => handleSaveOrder()} >
                                Guardar
                            </Button>
                            <Button color="danger" variant="flat" onPress={() => setIsOrdering(false)}>
                                Cancelar
                            </Button>
                        </>
                    )}
                    <Button isIconOnly color='warning' className='text-lg' href='/dashboard/products/create' as={Link}>+</Button>
                </div>
            </CardHeader>
        </>
    );
};

export default HeaderProducts;
