'use client';
import { Accordion, AccordionItem } from '@nextui-org/react';
import UploadLogo from '@/components/uploadLogo';
import UpdateMetadata from '@/components/updateMetaSeo';
import ColorPicker from '@/components/ColorPicker';
import { ConfigProvider } from '@/hooks/ConfigContext';

export default function Site() {  // Cambia a `export default`
  return (
    <ConfigProvider >
      <div>
        <Accordion variant="bordered" isCompact defaultExpandedKeys={["1"]} className='backdrop-blur-md  border-1 border-[#0ea5e9]/30 bg-[#012133]/40'>
         
          <AccordionItem key="1" aria-label="Accordion 2" title="Colores">
            <ColorPicker />
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 1" title="Logo" >
            <UploadLogo />
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="SEO (Titulo, Slogan, Descripcion, KeyWords)">
            <UpdateMetadata />
          </AccordionItem>
        </Accordion>
      </div>
    </ConfigProvider>
  );
}