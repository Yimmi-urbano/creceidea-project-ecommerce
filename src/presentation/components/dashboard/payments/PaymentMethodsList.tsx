"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getModules } from "@/src/application/modules/getModules";
import { Module } from "@/src/domain/modules/Module";
import { getDomainFromLocalStorage } from "@/config/utils";
import { CreditCard, Settings, ChevronRight, AlertCircle, Search } from "lucide-react";

export default function PaymentMethodsList() {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
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

    // Filter modules by search term
    const filteredModules = modules.filter(module =>
        module.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show search and summary only if more than 3 payment methods
    const showSearchAndSummary = modules.length > 3;

    // Calculate stats
    const totalModules = modules.length;
    const visibleModules = filteredModules.length;
    const activeModules = filteredModules.filter(m => m.activeType === 'active').length;

    if (loading) {
        return (
            <div className="space-y-6">
                {/* Skeleton for search and summary */}
                <div className="space-y-4">
                    <div className="h-11 w-full max-w-md rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 animate-pulse">
                                <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded mb-2"></div>
                                <div className="h-8 w-16 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skeleton for cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="flex flex-col bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
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
        <div className="space-y-6">
            {/* Search and Summary - Only show if more than 3 payment methods */}
            {showSearchAndSummary && (
                <>
                    {/* Search Bar */}
                    <div className="flex-1 max-w-md relative group">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors"
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar métodos de pago..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-primary bg-white dark:bg-dark-card"
                        />
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1">
                                {searchTerm ? 'Visibles' : 'Total de Métodos'}
                            </p>
                            <p className={`text-2xl font-bold ${searchTerm ? 'text-primary' : 'text-zinc-900 dark:text-white'}`}>
                                {searchTerm ? visibleModules : totalModules}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1">Activos</p>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeModules}</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1">Inactivos</p>
                            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                                {visibleModules - activeModules}
                            </p>
                        </div>
                    </div>
                </>
            )}

            {/* Payment Methods Grid */}
            {filteredModules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredModules.map((module) => (
                        <div
                            key={module.id}
                            className="group flex flex-col bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
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
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors group-hover:bg-primary group-hover:text-white"
                                >
                                    <Settings size={18} />
                                    Configurar
                                    <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                        <CreditCard className="w-8 h-8 text-zinc-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No se encontraron resultados</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md mt-2">
                        No hay métodos de pago que coincidan con "{searchTerm}"
                    </p>
                </div>
            )}
        </div>
    );
}
