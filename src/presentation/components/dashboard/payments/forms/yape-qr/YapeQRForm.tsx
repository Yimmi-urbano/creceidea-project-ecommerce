"use client";

import { toast } from "sonner";
import { useState, useEffect } from 'react';
import { Switch } from "@nextui-org/react";
import { getPayment, addPayment, editPayment } from "@/src/application/payments_methods/paymentsServices";
import { Payment } from "@/src/domain/payments_methods/Payment";
import UploadQrImage from "@/src/presentation/components/dashboard/payments/forms/yape-qr/UploadQrImage";
import { Save, RefreshCw } from "lucide-react";

function usePaymentForm(nameId: string) {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [form, setForm] = useState<Payment>({
    name: "",
    nameId: nameId,
    isActive: isSelected,
    details: { number_yape: "", urlQR: "", description: "" },
    credentials: { publicKey: "999888777", privateKey: "999888777", clientId: "", secretKey: "", merchantId: "" },
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
    if (!form.nameId) return toast.error("Completa los campos obligatorios");
    setLoading(true);

    const result = await addPayment(form);
    if (result) {
      toast.success("Método de pago creado correctamente");
      setIsUpdate(true);
      fetchPayment();
    }

    setLoading(false);
  };

  const updatePayment = async () => {

    if (!nameId) {
      toast.error("Error: No hay un método de pago válido para actualizar");
      return;
    }

    setLoading(true);

    const result = await editPayment(nameId, form);
    if (result) {
      toast.success("Método de pago actualizado correctamente");
    }

    setLoading(false);
  };

  return { form, loading, handleChange, createPayment, updatePayment, isUpdate, setForm };
}

export default function YapeQRForm({ nameId }: { nameId: string }) {
  const { form, loading, handleChange, createPayment, updatePayment, isUpdate, setForm } = usePaymentForm(nameId);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 md:p-8 bg-white dark:bg-[#13161c] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Información del Método
              </h3>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {form.isActive ? "Activo" : "Inactivo"}
                </label>
                <Switch
                  isSelected={form.isActive ?? false}
                  onValueChange={async (val) => {
                    const updatedForm = { ...form, isActive: val };
                    setForm(updatedForm);
                    if (nameId && isUpdate) {
                      await editPayment(nameId, updatedForm);
                    }
                  }}
                  color="success"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-[#00A09D]",
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nombre Público
                </label>
                <input
                  type="text"
                  placeholder="Ej: Pagar con Yape"
                  value={form.name ?? ""}
                  onChange={(e) => handleChange(e, undefined, "name")}
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900/50 border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-[#00A09D] focus:ring-1 focus:ring-[#00A09D] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Número de Yape
                </label>
                <input
                  type="text"
                  placeholder="Ej: 999 888 777"
                  value={form.details?.number_yape ?? ""}
                  onChange={(e) => handleChange(e, "details", "number_yape")}
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900/50 border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-[#00A09D] focus:ring-1 focus:ring-[#00A09D] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Instrucciones para el cliente
                </label>
                <textarea
                  placeholder="Ej: Escanea el QR e ingresa el monto a pagar..."
                  value={form.details?.description ?? ""}
                  onChange={(e) => handleChange(e as any, "details", "description")}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900/50 border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-[#00A09D] focus:ring-1 focus:ring-[#00A09D] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 mt-8 flex justify-end">
                <button
                  onClick={isUpdate ? updatePayment : createPayment}
                  disabled={loading}
                  className="flex items-center gap-2 bg-[#00A09D] hover:bg-[#008f8c] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-[#00A09D]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    isUpdate ? <RefreshCw size={18} /> : <Save size={18} />
                  )}
                  {isUpdate ? "Guardar Cambios" : "Crear Método"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: QR Upload */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-white dark:bg-[#13161c] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
              Código QR
            </h3>
            <div className="aspect-square w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 mb-4 overflow-hidden">
              <UploadQrImage
                onImageUpload={(url) => setForm((prev) => ({ ...prev, details: { ...prev.details, urlQR: url } }))}
                initialImage={form.details?.urlQR}
              />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
              Sube una imagen clara de tu código QR.
              <br />Formatos aceptados: PNG, JPG.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
