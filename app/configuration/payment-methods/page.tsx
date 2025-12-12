"use client";

import PaymentMethodsList from "@/src/presentation/components/dashboard/payments/PaymentMethodsList";

export default function PaymentMethodsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1">Métodos de Pago</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Administra los métodos de pago disponibles en tu tienda
                    </p>
                </div>
            </div>

            {/* Module List */}
            <PaymentMethodsList />
        </div>
    );
}
