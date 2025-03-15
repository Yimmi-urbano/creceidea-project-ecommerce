import { useState, useEffect } from "react";
import { Input, Button, Switch, Card } from "@nextui-org/react";
import { updateWhatsappHome, WhatsappHome } from "@/hooks/useWhatsappHome";
import { useConfig } from "@/hooks/ConfigContext";

const WhatsappSettings: React.FC = () => {
    const { config } = useConfig();
    const [whatsappHome, setWhatsappHome] = useState<WhatsappHome>({
        number: config?.whatsapp_home?.number || "",
        message_custom: config?.whatsapp_home?.message_custom || "",
        isActive: config?.whatsapp_home?.isActive || false,
    });

    const handleSubmit = async () => {
        const success = await updateWhatsappHome(whatsappHome);
        if (success) alert("Configuración actualizada correctamente");
    };

    return (
        <div className='flex gap-3 flex-wrap w-full'>
            <Input
                type="tel"
                label="Número de WhatsApp"
                placeholder="+51 999 999 999"
                value={whatsappHome.number}
                onChange={(e) => setWhatsappHome((prev) => ({ ...prev, number: e.target.value }))}
                classNames={{
                    inputWrapper: [
                      'border-1 border-[#0ea5e9]/40 bg-sky-900'
                    ]
                  }}
            />
            <Input
                type="text"
                label="Mensaje Predeterminado"
                placeholder="Hola, ¿en qué puedo ayudarte?"
                value={whatsappHome.message_custom}
                onChange={(e) => setWhatsappHome((prev) => ({ ...prev, message_custom: e.target.value }))}
                classNames={{
                    inputWrapper: [
                      'border-1 border-[#0ea5e9]/40 bg-sky-900'
                    ]
                  }}
            />
            <div className="flex items-center justify-end w-full mt-4 mb-4 gap-3">
                <span>Activar WhatsApp</span>
                <Switch
                    color="success"
                    isSelected={whatsappHome.isActive ? true : false }
                    onChange={(e) => setWhatsappHome((prev) => ({ ...prev, isActive: e.target.checked }))}
                />
            </div>
            <Button 
            color="success"
            onClick={handleSubmit}
            className='mb-4 w-full'
            >
                Actualizar WhatsApp Flotante
            </Button>
        </div>
    );
};

export default WhatsappSettings;
