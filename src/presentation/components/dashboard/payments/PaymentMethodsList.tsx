"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getModules } from "@/src/application/installed_modules/getModules";
import { Module } from "@/src/domain/installed_modules/Module";
import { Spinner } from "@nextui-org/react"; // Assuming we still use NextUI for generic components or replaced by custom if preferred
import { getDomainFromLocalStorage } from "@/config/utils";
import { CreditCard, Settings, ChevronRight, AlertCircle } from "lucide-react";

export default function PaymentMethodsList() {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const domain = getDomainFromLocalStorage();
    const router = useRouter();

    useEffect(() => {
        const loadModules = async () => {
            try {
                const data = await getModules(domain);
                setModules(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadModules();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="flex flex-col bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
                    >
                        <div className="p-6 flex-1 space-y-4">
                            {/* Icon skeleton */}
                            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />

                            {/* Title skeleton */}
                            <div className="h-6 w-3/4 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />

                            {/* Description skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                <div className="h-4 w-5/6 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            </div>
                        </div>

                        <div className="p-6 pt-0">
                            {/* Button skeleton */}
                            <div className="h-10 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 rounded-full bg-rose-100 dark:bg-rose-900/20 mb-4">
                    <AlertCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Error al cargar módulos</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md mt-2">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (modules.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                    <CreditCard className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No hay módulos disponibles</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md mt-2">
                    Actualmente no hay métodos de pago disponibles para configurar.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
            {modules.map((module) => (
                <div
                    key={module.id}
                    className="group flex flex-col bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                >
                    <div className="p-6 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center mb-4 p-2">
                            <img
                                src={module.logo}
                                alt={module.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                            {module.title}
                        </h3>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {module.description}
                        </p>
                    </div>

                    <div className="p-6 pt-0 mt-auto">
                        <button
                            onClick={() => router.push(`/configuration/payment-methods/${module.nameId}`)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#00A09D]/10 hover:bg-[#00A09D]/20 text-[#00A09D] font-medium transition-colors group-hover:bg-[#00A09D] group-hover:text-white"
                        >
                            <Settings size={18} />
                            Configurar
                            <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
