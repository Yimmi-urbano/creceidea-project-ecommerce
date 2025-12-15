'use client';

import React from 'react';
import { Card, CardHeader, CardBody, Skeleton } from '@nextui-org/react';
import { Palette, Image as ImageIcon, Search, MessageCircle } from 'lucide-react';
import UploadLogo from '@/src/presentation/components/client/UploadLogo';
import UpdateMetadata from '@/src/presentation/components/client/UpdateMetaSeo';
import WhatsappSettings from '@/src/presentation/components/client/WhatsAppHome';
import ColorPicker from '@/src/presentation/components/client/ColorPicker';
import { ConfigProvider, useConfig } from '@/src/presentation/contexts';

// Skeleton Component
function SiteConfigSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64 rounded-lg mb-2" />
        <Skeleton className="h-4 w-96 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card">
            <CardHeader className="flex gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-3 w-64 rounded-lg" />
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-4">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-3/4 rounded-lg" />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Main Content Component
function SiteConfigContent() {
  const { loading } = useConfig();

  if (loading) {
    return <SiteConfigSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Configuración del Sitio</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Personaliza la apariencia y la información clave de tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colors Section */}
        <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card">
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
        <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card">
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
        <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card">
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
        <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card">
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
  );
}

export default function Site() {
  return (
    <ConfigProvider>
      <SiteConfigContent />
    </ConfigProvider>
  );
}