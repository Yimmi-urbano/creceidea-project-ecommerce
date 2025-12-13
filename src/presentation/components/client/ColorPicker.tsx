import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Input, Button } from '@nextui-org/react';
import { ChromePicker } from 'react-color';
import { useConfig } from '@/src/presentation/contexts';
import { updateThemeColors } from '@/src/application/configuration/configurationServices';
import { NotificationModal } from '@/src/presentation/components/client/utils/NotificationModal';

interface Color {
  title: string;
  hex: string;
}

const ColorPicker: React.FC = () => {
  const { config, loading } = useConfig();
  const [colors, setColors] = useState<Color[]>([
    { title: 'Primario', hex: '' },
    { title: 'Secundario', hex: '' },
    { title: 'Alternativo', hex: '' }
  ]);
  const [showPickers, setShowPickers] = useState<boolean[]>([false, false, false]);

  const pickerRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    if (config && !loading) {
      const fetchedColors = (config as any).colors || [];
      if (fetchedColors.length > 0) {
        const colorObjects = fetchedColors.map((color: string, index: number) => ({
          title: `Color ${index + 1}`,
          hex: color,
        }));
        setColors(colorObjects);
        setShowPickers(Array(fetchedColors.length).fill(false));
      }
    }
  }, [config, loading]);

  const handleColorChange = (color: string, index: number) => {
    const newColors = [...colors];
    newColors[index].hex = color;
    setColors(newColors);
  };

  const handlePickerToggle = (index: number) => {
    const newShowPickers = [...showPickers];
    newShowPickers[index] = !newShowPickers[index];
    setShowPickers(newShowPickers);
  };

  const handleClickOutside = (event: MouseEvent) => {
    pickerRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target as Node)) {
        setShowPickers((prev) => {
          const newShowPickers = [...prev];
          newShowPickers[index] = false;
          return newShowPickers;
        });
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUpdateColors = async () => {
    try {
      const colorHexes = colors.map((color) => color.hex);
      setIsModalLoading(true); // Comienza la carga
      setIsModalOpen(true); // Abre el modal

      await updateThemeColors(colorHexes);
      setModalMessage('Colores actualizados correctamente!'); // Actualiza el mensaje con el resultado
      setIsModalLoading(false); // Finaliza la carga
    } catch (error) {
      toast.error('Error updating colors');
    }
  };

  return (
    <div className="color-picker-container">
      {colors.map((colorObj, index) => (
        <div className="color-picker-item mb-4" key={index}>
          <label htmlFor={`color${index}`}>{colorObj.title}</label>
          <div
            className="color-picker-input"
            ref={(el) => {
              pickerRefs.current[index] = el;
            }}
          >
            <Input
              type="text"
              variant="bordered"
              value={colorObj.hex}
              onClick={() => handlePickerToggle(index)}
              onChange={(e) => handleColorChange(e.target.value, index)}
              placeholder="Enter HEX code"
              isReadOnly
              maxLength={7}
              classNames={{
                inputWrapper: "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                input: "text-zinc-900 dark:text-zinc-100",
              }}
              startContent={
                <div
                  className="shadow-sm border border-zinc-200 dark:border-white/10"
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: colorObj.hex,
                    borderRadius: '6px',
                    marginRight: '8px',
                  }}
                />
              }
            />
            {showPickers[index] && (
              <div className="absolute z-50 mt-2">
                <div className="fixed inset-0" onClick={() => handlePickerToggle(index)} />
                <ChromePicker
                  color={colorObj.hex}
                  disableAlpha
                  onChangeComplete={(color) => handleColorChange(color.hex, index)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <Button
        onClick={handleUpdateColors}
        className='w-full font-medium'
        color='primary'
        isLoading={isModalLoading}
      >
        Actualizar Colores
      </Button>


      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isModalLoading}
        message={modalMessage}
      />
    </div>
  );
};

export default ColorPicker;
