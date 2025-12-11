'use client';
import { Accordion, AccordionItem } from '@nextui-org/react';
import UploadLogo from '@/src/presentation/components/client/uploadLogo';
import UpdateMetadata from '@/src/presentation/components/client/updateMetaSeo';
import WhatsappSettings from '@/src/presentation/components/client/whatsappHome';
import ColorPicker from '@/src/presentation/components/client/ColorPicker';
import { ConfigProvider } from '@/src/presentation/contexts';

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
          <AccordionItem key="4" aria-label="Accordion 3" title="Configura WhatsApp Flotante">
            <WhatsappSettings />
          </AccordionItem>
        </Accordion>
      </div>
    </ConfigProvider>
  );
}