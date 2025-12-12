import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { Input, Button, Switch, Card, Textarea } from "@nextui-org/react";
import { updateWhatsappHome, WhatsappHome } from "@/src/presentation/hooks/configuration/useWhatsappHome";
import { useConfig } from "@/src/presentation/contexts";

const WhatsappSettings: React.FC = () => {
    const { config } = useConfig();
    const [whatsappHome, setWhatsappHome] = useState<WhatsappHome>({
        number: config?.whatsapp_home?.number || "",
        message_custom: config?.whatsapp_home?.message_custom || "",
        isActive: config?.whatsapp_home?.isActive || false,
    });

    useEffect(() => {
        if (config?.whatsapp_home) {
            setWhatsappHome({
                number: config.whatsapp_home.number || "",
                message_custom: config.whatsapp_home.message_custom || "",
                isActive: config.whatsapp_home.isActive || false,
            });
        }
    }, [config]);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const success = await updateWhatsappHome(whatsappHome);
            if (success) toast.success("Configuración actualizada correctamente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex gap-3 flex-wrap w-full'>
            <div className="flex flex-col gap-4 w-full">
                <Input
                    label="Número de WhatsApp"
                    variant="bordered"
                    placeholder="Ej: +51 999 999 999"
                    labelPlacement="outside"
                    value={whatsappHome.number}
                    onChange={(e) => setWhatsappHome((prev) => ({ ...prev, number: e.target.value }))}
                    classNames={{
                        inputWrapper: "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                        input: "text-zinc-900 dark:text-zinc-100",
                    }}
                />
                <Textarea
                    label="Mensaje Predeterminado"
                    variant="bordered"
                    placeholder="Ej: Hola, quisiera más información..."
                    labelPlacement="outside"
                    value={whatsappHome.message_custom}
                    onChange={(e) => setWhatsappHome((prev) => ({ ...prev, message_custom: e.target.value }))}
                    classNames={{
                        inputWrapper: "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                        input: "text-zinc-900 dark:text-zinc-100",
                    }}
                />

                <div className="flex items-center justify-between w-full mt-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Activar WhatsApp Flotante</span>
                    <Switch
                        color="success"
                        isSelected={whatsappHome.isActive}
                        onChange={(e) => setWhatsappHome((prev) => ({ ...prev, isActive: e.target.checked }))}
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    color="primary"
                    className="w-full font-medium"
                    isLoading={loading}
                >
                    Guardar Configuración
                </Button>
            </div>
        </div>
    );
};

export default WhatsappSettings;
