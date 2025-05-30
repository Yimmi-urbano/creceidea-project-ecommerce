"use client";

import { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, Textarea, Switch } from "@nextui-org/react";
import { getPayment, addPayment, editPayment } from "@/application/payments_methods/paymentsServices";
import { Payment } from "@/domain/payments_methods/Payment";


function usePaymentForm(nameId: string) {


  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [form, setForm] = useState<Payment>({
    name: "",
    nameId: nameId,
    isActive: isSelected,
    details: { number_yape: "", urlQR: "", description: "" },
    credentials: { publicKey: "", privateKey: "999888777", clientId: "", secretKey: "", merchantId: "" },
  });



  useEffect(() => {
    if (nameId) fetchPayment();
  }, [nameId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, section?: keyof Payment, key?: string) => {
    if (!key) return;

    setForm((prev) => ({
      ...prev,
      [section ? section : key]: section
        ? {
          ...((prev[section] as Record<string, string>) || {}),
          [key]: e.target.value
        }
        : e.target.value,
    }));
  };

  const fetchPayment = async () => {
    if (!nameId) return;
    setLoading(true);
    const result = await getPayment(nameId);
    if (result) {
      setForm({
        name: result.name ?? "",
        isActive: result.isActive ?? false,
        details: {
          number_yape: result.details?.number_yape ?? "",
          urlQR: result.details?.urlQR ?? "",
          description: result.details?.description ?? ""
        },
        credentials: {
          publicKey: result.credentials?.publicKey ?? "",
          privateKey: result.credentials?.privateKey ?? "",
          clientId: result.credentials?.clientId ?? "",
          secretKey: result.credentials?.secretKey ?? "",
          merchantId: result.credentials?.merchantId ?? "",
        },
      });
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
    setLoading(false);
  };

  const createPayment = async () => {
    if (!form.nameId) return alert("Completa los campos obligatorios");
    setLoading(true);

    const result = await addPayment(form);
    if (result) {
      alert("Método de pago creado correctamente");
      setIsUpdate(true);
      fetchPayment();
    }

    setLoading(false);
  };

  const updatePayment = async () => {

    if (!nameId) {
      alert("Error: No hay un método de pago válido para actualizar");
      return;
    }


    setLoading(true);

    const result = await editPayment(nameId, form);
    if (result) {
      alert("Método de pago actualizado correctamente");
    }

    setLoading(false);
  };


  return { form, loading, handleChange, createPayment, updatePayment, isUpdate, setForm };
}

export default function YapeQRForm({ nameId }: { nameId: string }) {
  const { form, loading, handleChange, createPayment, updatePayment, isUpdate, setForm } = usePaymentForm(nameId);


  return (
    <div className="w-full p-0">
      <Card shadow="none" className="h-full border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40 w-[100%]" isBlurred>
        <CardBody className="flex flex-row gap-3">
          <div className="flex flex-col gap-3 w-full">
            <Input label="Nombre" placeholder="Ej: Paga con tarjetas Debito/Credito" value={form.name ?? ""} onChange={(e) => handleChange(e, undefined, "name")} classNames={
              {
                label: "text-black/50 dark:text-white/90",
                innerWrapper: "bg-transparent",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-cyan-500/50",
                  "dark:bg-cyan-600/10",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }
            } />
            <Input label="Merchant ID" placeholder="Ej: 90001000" value={form.credentials?.merchantId || ""} onChange={(e) => handleChange(e, "credentials", "merchantId")} classNames={
              {
                label: "text-black/50 dark:text-white/90",
                innerWrapper: "bg-transparent",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-cyan-500/50",
                  "dark:bg-cyan-600/10",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }
            } />
            <Input label="Public Key" placeholder="Ej: hM6Ytfn8AoTGB5nM" value={form.credentials?.publicKey ?? ""} onChange={(e) => handleChange(e, "credentials", "publicKey")} classNames={
              {
                label: "text-black/50 dark:text-white/90",
                innerWrapper: "bg-transparent",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                inputWrapper: [
                  "shadow-xl",
                  "bg-cyan-500/50",
                  "dark:bg-cyan-600/10",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }
            } />
            <Input className="hidden" label="URL QR" placeholder="Ej: https://media.qr.com" value={form.details?.urlQR ?? ""} onChange={(e) => handleChange(e, "details", "urlQR")} />

            <Button color="success" variant="flat" onClick={isUpdate ? updatePayment : createPayment} isLoading={loading} className="mt-4">
              {isUpdate ? "Actualizar Método de Pago" : "Crear Método de Pago"}
            </Button>

            <Switch
              isSelected={form.isActive ?? false}
              onValueChange={async (val) => {
                const updatedForm = { ...form, isActive: val };
                setForm(updatedForm);
                await editPayment(nameId, updatedForm);
                alert('Se actualizó correctamente.')
              }}
              color="success"
            >
              ¿Activo?
            </Switch>
          </div>
          <div className="w-full text-center flex">

          </div>
        </CardBody>
      </Card>
    </div>
  );
}
