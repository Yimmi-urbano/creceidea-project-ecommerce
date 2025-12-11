"use client"
import React, { useState } from 'react';
import { ConfigProvider } from '@/src/presentation/contexts';
import UpdateCatalogForm from '@/src/presentation/components/client/UpdateCatalogo';

export default function CatalogConfig() {


  return (
    <div>
      <ConfigProvider>
        <UpdateCatalogForm />
      </ConfigProvider>
    </div>
  );
}
