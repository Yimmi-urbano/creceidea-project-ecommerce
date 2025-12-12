import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardHeader, CardBody, Select, SelectItem, Switch } from '@nextui-org/react';
import { useConfig } from '@/src/presentation/contexts';
import useUpdateCatalog from '@/src/presentation/hooks/configuration/useUpdateCatalog';
import { NotificationModal } from '@/src/presentation/components/client/utils/NotificationModal'; // Importar el modal

const UpdateCatalogForm: React.FC = () => {
  const { config, loading } = useConfig();
  const { updateCatalog, updating, currencies, getCurrencies } = useUpdateCatalog();

  const [buttonText, setButtonText] = useState('');
  const [buttonAction, setButtonAction] = useState('');
  const [buttonColorBg, setButtonColorBg] = useState('');
  const [buttonColorText, setButtonColorText] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [whatsappIsActive, setWhatsappIsActive] = useState(false);

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
      setWhatsappMessage(config.catalogo.whatsapp.message_custom);
      setWhatsappIsActive(config.catalogo.whatsapp.isActive);
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
        message_custom: whatsappMessage,
        isActive: whatsappIsActive,
      },
      currency: selectedCurrency,
    };

    setIsModalLoading(true); // Comienza la carga
    setIsModalOpen(true); // Abre el modal

    const result = await updateCatalog(catalogo);
    setModalMessage(result.message); // Actualiza el mensaje con el resultado
    setIsModalLoading(false); // Finaliza la carga
  };

  const handleSelectionChange = (keys: Set<string> | any) => {
    // NextUI Select returns a Set or string depending on selection mode, handling keys safely
    const selectedKey = keys instanceof Set ? Array.from(keys)[0] : keys;
    const currency = currencies.find((curr) => curr.code === selectedKey);
    if (currency) {
      setSelectedCurrency(currency);
    }
  };

  if (loading) {
    return <div className="p-4">Cargando configuración...</div>;
  }

  return (
    <>
      <Card shadow="none" className="h-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 w-full">
        <CardHeader className="flex flex-col items-start gap-2 px-6 pt-6 pb-0">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Configura tu catálogo</h2>
          <p className="text-sm text-zinc-500">Personaliza la experiencia de tus clientes.</p>
        </CardHeader>
        <CardBody className="gap-6 p-6">

          {/* Sección Botón */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-200">Botón de Acción</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Texto del botón"
                placeholder="Ej: Pedir por WhatsApp"
                variant="bordered"
                labelPlacement="outside"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                classNames={{
                  inputWrapper: "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                  input: "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400",
                  label: "text-zinc-600 dark:text-zinc-400 font-medium"
                }}
              />
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800" />

          {/* Sección WhatsApp */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-200">WhatsApp Flotante</h3>
              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Activar</span>
                <Switch
                  color="success"
                  size="sm"
                  isSelected={whatsappIsActive}
                  onChange={(e) => setWhatsappIsActive(e.target.checked)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Número de WhatsApp"
                placeholder="Ej: +51 999 999 999"
                variant="bordered"
                labelPlacement="outside"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                classNames={{
                  inputWrapper: "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                  input: "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400",
                  label: "text-zinc-600 dark:text-zinc-400 font-medium"
                }}
              />

              <Input
                label="Mensaje Predeterminado"
                placeholder="Ej: Hola, quiero más info..."
                variant="bordered"
                labelPlacement="outside"
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                classNames={{
                  inputWrapper: "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                  input: "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400",
                  label: "text-zinc-600 dark:text-zinc-400 font-medium"
                }}
              />
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800" />

          {/* Sección Moneda */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-zinc-900 dark:text-zinc-200">Configura tu moneda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Moneda"
                placeholder="Seleccione..."
                disabledKeys={['']}
                variant="bordered"
                labelPlacement="outside"
                selectedKeys={selectedCurrency.code ? new Set([selectedCurrency.code]) : new Set([])}
                onSelectionChange={handleSelectionChange}
                classNames={{
                  trigger: "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                  label: "text-zinc-600 dark:text-zinc-400 font-medium",
                  value: "text-zinc-900 dark:text-zinc-100"
                }}
              >
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} textValue={`${currency.symbol} ${currency.code}`}>
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-[#00A09D]">{currency.symbol}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              className="w-full md:w-auto font-medium"
              isLoading={updating}
              onPress={handleUpdate}
              color="primary"
            >
              {updating ? 'Actualizando...' : 'Actualizar Catálogo'}
            </Button>
          </div>
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
