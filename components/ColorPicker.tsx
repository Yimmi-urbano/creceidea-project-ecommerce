'use strict'
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from '@nextui-org/react';
import { ChromePicker } from 'react-color';
import { useConfig } from '@/hooks/ConfigContext';
import { updateColors } from '@/hooks/colorService';

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
      await updateColors(colorHexes);
      alert('Colores actualizados correctamente!');
    } catch (error) {
      alert('Error updating colors');
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
              value={colorObj.hex}
              onClick={() => handlePickerToggle(index)}
              onChange={(e) => handleColorChange(e.target.value, index)}
              placeholder="Enter HEX code"
              isReadOnly
              maxLength={7}
              classNames={{
                inputWrapper: [
                  'border-1 border-[#0ea5e9]/40 bg-sky-900'
                ]
              }}
              startContent={
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: colorObj.hex,
                    borderRadius: '4px',
                    marginRight: '8px',
                  }}
                />
              }
            />
            {showPickers[index] && (
              <div className="color-picker-popover">
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
      <Button onClick={handleUpdateColors} className='w-full' color='success'>Actualizar Colores</Button>
    </div>
  );
};

export default ColorPicker;
