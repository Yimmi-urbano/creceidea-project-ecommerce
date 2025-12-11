"use client";

import React from 'react';
import { Globe, HardDrive, Cpu, Server, Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/src/presentation/components/shared/Badge';

interface Service {
    id: number;
    name: string;
    detail: string;
    type: 'domain' | 'hosting' | 'server';
    status: 'active' | 'warning';
    expiry: string;
    icon: React.ElementType;
}

const SERVICES_DATA: Service[] = [
    { id: 1, name: "Dominio Principal", detail: "restaurante-ejemplo.com", type: "domain", status: "active", expiry: "25 Nov 2025", icon: Globe },
    { id: 2, name: "Hosting Premium", detail: "50GB SSD / Ilimitado", type: "hosting", status: "active", expiry: "15 Dic 2025", icon: HardDrive },
    { id: 3, name: "Servidor VPS", detail: "4 vCPU / 8GB RAM", type: "server", status: "warning", expiry: "05 Dic 2025", icon: Cpu },
];

export default function PageServices() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight mb-1">Mis Servicios Tecnológicos</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Administra tus dominios, hosting y servidores contratados.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES_DATA.map((service) => {
                    const Icon = service.icon;

                    return (
                        <div
                            key={service.id}
                            className="p-6 rounded-2xl border flex flex-col justify-between h-full transition-all hover:shadow-lg bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 hover:border-[#00A09D]/30"
                        >
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200">
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <Badge status={service.status} type="service" />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{service.name}</h3>
                                <p className="text-sm text-[#00A09D] font-medium mb-4">{service.detail}</p>

                                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                    <Clock size={14} />
                                    <span>Renueva: {service.expiry}</span>
                                </div>
                            </div>

                            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#00A09D] text-[#00A09D] font-medium hover:bg-[#00A09D] hover:text-white transition-all text-sm group">
                                Auto Gestor
                                <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Help Banner */}
            <div className="p-6 rounded-2xl border flex items-center gap-6 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                <div className="p-4 bg-blue-500 rounded-full text-white shadow-lg shadow-blue-500/30">
                    <Server size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-lg text-blue-500 mb-1">¿Necesitas más recursos?</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Puedes escalar tu servidor o adquirir nuevos dominios directamente desde el panel de soporte.
                    </p>
                </div>
                <button className="ml-auto whitespace-nowrap px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20 transition-all">
                    Ver Catálogo IT
                </button>
            </div>
        </div>
    );
}
