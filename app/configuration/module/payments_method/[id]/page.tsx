"use client";

import React, { Suspense, lazy } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CardBody } from "@nextui-org/react";

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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/configuration/module/payments_method"
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-zinc-600 dark:text-zinc-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Configuración de {titleModule(nameId)}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Administra los detalles de integración
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<p>Cargando formulario...</p>}>
        <PaymentForm nameId={nameId} />
      </Suspense>
    </div>
  );
};

export default ConfigPaymentMethod;
