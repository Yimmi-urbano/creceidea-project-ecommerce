"use client";

import React, { Suspense, lazy } from "react";
import { useParams } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

const loadPaymentForm = (nameId: string) => {
  switch (nameId) {
    case "yape_qr":
      return lazy(() => import("@/ui/payments_methods/yape_qr_offline/YapeQRForm"));
    case "izipay_ya":
      return lazy(() => import("@/ui/payments_methods/izipay_ya/IziPayForm"));
      case "coordina_whatsapp":
        return lazy(() => import("@/ui/payments_methods/coordina_whatsapp/CoordinaWhatsAppForm"));
    default:
      return lazy(() => import("@/ui/payments_methods/default"));
  }
};

const titleModule = (nameId: string) => {

  switch (nameId) {
    case "yape_qr":
      return "Yape con QR"
    case "izipay_ya":
      return "Acepta pagos con Izipay"
        case "coordina_whatsapp":
      return "Coordina con WhatsApp"
    default:
      return "title_module";
  }

}

const ConfigPaymentMethod: React.FC = () => {
  const params = useParams();
  const nameId = params?.id as string;

  const PaymentForm = loadPaymentForm(nameId);

  return (
    <Card shadow="none" className="h-[80vh] bg-transparent w-full">
      <CardHeader className="bg-transparent flex justify-between">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white">
          Configuración de {titleModule(nameId)}
        </h2>
      </CardHeader>
      <CardBody>
        <Suspense fallback={<p>Cargando formulario...</p>}>
          <PaymentForm nameId={nameId} />
        </Suspense>
      </CardBody>
    </Card>
  );
};

export default ConfigPaymentMethod;
