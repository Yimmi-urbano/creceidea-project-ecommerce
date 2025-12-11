"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import OrderDetails from '@/src/presentation/components/client/orderDetails/OrderDetails';

const PageOrdersDetail: React.FC = () => {
  const params = useParams();
  const orderId = params?.id as string;

  return (
    <Card shadow="none" className="h-[80vh] bg-transparent">
      <CardHeader className="bg-transparent flex justify-between">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white">Detalle de Pedidos</h2>
      </CardHeader>
      <CardBody>
      <OrderDetails orderId={orderId} />
      </CardBody>
    </Card>
  );
};

export default PageOrdersDetail;
