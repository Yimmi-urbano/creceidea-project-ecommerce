import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardHeader, CardBody, Select, SelectItem } from '@nextui-org/react';
import { useConfig } from '@/hooks/ConfigContext';
import useUpdateCatalog from '@/hooks/useUpdateCatalog';
import { NotificationModal } from '@/components/utils/NotificationModal'; // Importar el modal

const UpdateCatalogForm: React.FC = () => {
  const { config, loading } = useConfig();
  const { updateCatalog, updating, currencies, getCurrencies } = useUpdateCatalog();

  const [buttonText, setButtonText] = useState('');
  const [buttonAction, setButtonAction] = useState('');
  const [buttonColorBg, setButtonColorBg] = useState('');
  const [buttonColorText, setButtonColorText] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<{ code: string; symbol: string }>({ code: '', symbol: '' });

  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Efecto para cargar la configuración
  useEffect(() => {
    if (config?.catalogo) {
      setButtonText(config.catalogo.button.text);
      setButtonAction(config.catalogo.button.action);
      setButtonColorBg(config.catalogo.button.color_bg);
      setButtonColorText(config.catalogo.button.color_text);
      setWhatsappNumber(config.catalogo.whatsapp.number);
      setSelectedCurrency(config.catalogo.currency || { code: '', symbol: '' }); // Manejo de valor nulo
    }
  }, [config]);

  // Efecto para obtener monedas
  useEffect(() => {
    if (currencies.length === 0) {
      getCurrencies();
    }
  }, [currencies.length, getCurrencies]);

  const handleUpdate = async () => {
    const catalogo = {
      button: {
        text: buttonText,
        action: buttonAction,
        color_bg: buttonColorBg,
        color_text: buttonColorText,
      },
      whatsapp: {
        number: whatsappNumber,
      },
      currency: selectedCurrency,
    };

    setIsModalLoading(true); // Comienza la carga
    setIsModalOpen(true); // Abre el modal

    const result = await updateCatalog(catalogo);
    setModalMessage(result.message); // Actualiza el mensaje con el resultado
    setIsModalLoading(false); // Finaliza la carga
  };

  const handleSelectionChange = (keys: Set<string>) => {
    const selectedKey = Array.from(keys)[0];
    const currency = currencies.find((curr) => curr.code === selectedKey);
    if (currency) {
      setSelectedCurrency(currency);
    }
  };

  if (loading) {
    return <span>Cargando configuración...</span>;
  }

  return (
    <>
      <Card key={1} isBlurred style={{ padding: '10px' }} className="h-full border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40 w-[100%]">
        <CardHeader>
          <span className="text-xl font-semibold text-gray-600 dark:text-white">Configura tu catálogo</span>
        </CardHeader>
        <CardBody>
          <div key="0" className="grid lg:grid-cols-2 gap-5">
            <Input
              label="Texto del botón"
              placeholder="Introduce el texto del botón"
              fullWidth
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              classNames={{
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
              }}
            />
            <Input
              label="Número de WhatsApp"
              placeholder="Introduce el número de WhatsApp"
              fullWidth
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              classNames={{
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
              }}
            />
            <Select
              label="Seleccione una moneda"
              placeholder="Seleccione una moneda"
              selectedKeys={new Set([selectedCurrency.code])}
              onSelectionChange={handleSelectionChange}
              classNames={{
                trigger: ["bg-[#082f49]/90"],
                popoverContent: ["backdrop-blur-md bg-[#082f49]/80"]
              }}
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {`${currency.symbol} ${currency.code}`}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Button
            className="mt-5"
            disabled={updating}
            onPress={handleUpdate}
            color="success"
          >
            {updating ? 'Actualizando...' : 'Actualizar Catálogo'}
          </Button>
        </CardBody>
      </Card>

      {/* Modal de notificación */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isModalLoading}
        message={modalMessage}
      />
    </>
  );
};

export default UpdateCatalogForm;
