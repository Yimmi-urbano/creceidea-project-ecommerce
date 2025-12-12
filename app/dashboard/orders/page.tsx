"use client";

import React from 'react';
import { Download } from 'lucide-react';
import Ordenes from '@/src/presentation/components/client/ordenes';

const PageOrders: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Pedidos</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Monitorea las ventas en tiempo real.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800">
          <Download size={16} /> Exportar Reporte
        </button>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl overflow-hidden bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
        <Ordenes />
      </div>
    </div>
  );
};

export default PageOrders;
