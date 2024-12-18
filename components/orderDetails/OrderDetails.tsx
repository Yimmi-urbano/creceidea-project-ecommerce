"use client";

import React from "react";
import useOrderDetails from "@/hooks/useOrderDetails";
import { Card, CardBody, CardHeader, Image, Spinner } from "@nextui-org/react";

const OrderDetails: React.FC<{ orderId: string }> = ({ orderId }) => {
    const { orderData, loading, error } = useOrderDetails(orderId);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Spinner color="primary" size="lg" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div>
            
            <Card shadow="sm" isBlurred className="mb-6 border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/20">
                <CardHeader>
                    <h2 className="text-lg font-semibold">Información del Pedido</h2>
                </CardHeader>
                <CardBody>
                    <p>
                        <strong>Número de Pedido:</strong> {orderData?.orderNumber}
                    </p>
                    <p>
                        <strong>Total:</strong> {orderData?.currency} {orderData?.total.toFixed(2)} 
                    </p>
                    <p>
                        <strong>Estado:</strong> {orderData?.orderStatus.message}
                    </p>
                    <p>
                        <strong>Cliente:</strong> {orderData?.clientInfo.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {orderData?.clientInfo.email}
                    </p>
                    <p>
                        <strong>Teléfono:</strong> {orderData?.clientInfo.phone}
                    </p>
                </CardBody>
            </Card>
            <Card isBlurred className="mb-6 border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/20 h-[400px]">
                <CardBody>
                    <h2 className="text-xl font-semibold mt-2 mb-2">Productos</h2>
                    <ul>
                        {orderData?.products.map((product) => (
                            <li key={product.id} className="mb-4 flex items-center">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    className="w-16 h-16 rounded mr-4"
                                />
                                <div>
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>Cantidad: {product.qty}</p>
                                    <p>
                                        Precio: {product.valid_price} {orderData.currency}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
        </div>
    );
};

export default OrderDetails;
