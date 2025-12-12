'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Palette, Image as ImageIcon, Search, MessageCircle } from 'lucide-react';
import UploadLogo from '@/src/presentation/components/client/UploadLogo';
import UpdateMetadata from '@/src/presentation/components/client/UpdateMetaSeo';
import WhatsappSettings from '@/src/presentation/components/client/WhatsAppHome';
import ColorPicker from '@/src/presentation/components/client/ColorPicker';
import { ConfigProvider } from '@/src/presentation/contexts';

export default function Site() {
  return (
    <ConfigProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Configuración del Sitio</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Personaliza la apariencia y la información clave de tu tienda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colors Section */}
          <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#13161c]">
            <CardHeader className="flex gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Palette size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-bold text-zinc-900 dark:text-zinc-100">Colores de la Marca</p>
                <p className="text-small text-zinc-500">Define la paleta de colores principal de tu tienda.</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <ColorPicker />
            </CardBody>
          </Card>

          {/* Logo Section */}
          <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#13161c]">
            <CardHeader className="flex gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ImageIcon size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-bold text-zinc-900 dark:text-zinc-100">Logo del Sitio</p>
                <p className="text-small text-zinc-500">Sube tu logo para el encabezado y correos.</p>
              </div>
            </CardHeader>
            <CardBody className="p-6 flex flex-col items-center justify-center">
              <UploadLogo />
            </CardBody>
          </Card>

          {/* SEO Section */}
          <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#13161c]">
            <CardHeader className="flex gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Search size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-bold text-zinc-900 dark:text-zinc-100">Optimización SEO</p>
                <p className="text-small text-zinc-500">Configura títulos y descripciones para buscadores.</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <UpdateMetadata />
            </CardBody>
          </Card>

          {/* WhatsApp Section */}
          <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#13161c]">
            <CardHeader className="flex gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <MessageCircle size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-bold text-zinc-900 dark:text-zinc-100">WhatsApp Flotante</p>
                <p className="text-small text-zinc-500">Configura el botón de chat directo para clientes.</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <WhatsappSettings />
            </CardBody>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
}