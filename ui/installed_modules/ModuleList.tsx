"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getModules } from "@/src/application/installed_modules/getModules";
import { Module } from "@/src/domain/installed_modules/Module";
import { Card, CardBody, CardHeader, Image, Button } from "@nextui-org/react";
import { getDomainFromLocalStorage } from "@/config/utils";

export default function ModuleList() {
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

    if (loading) return <p className="text-center text-gray-500">Cargando módulos...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 gap-4 p-1">
            {modules.map((module) => (
                <Card key={module.id} className="p-1 border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40" isBlurred>
                    <CardHeader className="flex gap-4">
                        <Image src={module.logo} width={40} height={40} alt={module.title} className="object-contain" />
                        <h5 className="text-sm font-semibold">{module.title}</h5>
                    </CardHeader>
                    <CardBody>
                        <p className="text-white-600">{module.description}</p>
                        <Button
                            color="success"
                            variant="flat"
                            className="mt-2 w-full"
                            onClick={() => router.push(`/configuration/module/payments_method/${module.nameId}`)}
                        >
                            Configurar
                        </Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
