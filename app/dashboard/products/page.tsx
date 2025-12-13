"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ProductProvider, useProductContext } from '@/src/presentation/contexts';
import { Search, Filter, Plus, LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { ProductGridView } from '@/src/presentation/components/client/products/ProductGridView';
import { ProductTableView } from '@/src/presentation/components/client/products/ProductTableView';
import CardProductEdit from '@/src/presentation/components/client/products/CardProductEdit';
import Paginator from '@/src/presentation/components/client/products/Paginator';
import { updateProductOrder } from '@/src/application/products/productServices';

function ProductsContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const { isOrdering, setIsOrdering, orderedProducts, fetchProducts } = useProductContext();

  const handleSaveOrder = async () => {
    const payload = orderedProducts.map((p: any) => ({
      id_product: p._id,
      order: p.order,
    }));

    try {
      await updateProductOrder(payload);
    } finally {
      setIsOrdering(false);
      await fetchProducts();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Catálogo de Productos</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Gestiona inventario, precios y descuentos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="hidden md:flex p-1 rounded-lg border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid'
                ? 'bg-[#00A09D]/10 text-[#00A09D]'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list'
                ? 'bg-[#00A09D]/10 text-[#00A09D]'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                }`}
            >
              <List size={18} />
            </button>
          </div>

          {/* Ordering Button - Only show in list view */}
          {viewMode === 'list' && !isOrdering && (
            <button
              onClick={() => setIsOrdering(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-[#00A09D] hover:text-[#00A09D]"
            >
              <ArrowUpDown size={16} />
              <span className="hidden sm:inline">Ordenar</span>
            </button>
          )}

          {/* Save/Cancel buttons when ordering */}
          {isOrdering && (
            <>
              <button
                onClick={handleSaveOrder}
                className="flex items-center gap-2 bg-[#00A09D] hover:bg-[#008f8c] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-[#00A09D]/25 transition-all"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsOrdering(false)}
                className="flex items-center gap-2 border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white dark:bg-[#13161c]"
              >
                Cancelar
              </button>
            </>
          )}

          {/* Add Button - Hide when ordering */}
          {!isOrdering && (
            <Link href="/dashboard/products/create">
              <button className="flex items-center gap-2 bg-[#00A09D] hover:bg-[#008f8c] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-[#00A09D]/25 transition-all">
                <Plus size={18} />
                <span>Agregar</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Search and Filters - Hide when ordering */}
      {!isOrdering && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 max-w-md relative group">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#00A09D] transition-colors"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en catálogo (ej: Inka Kola, Sopas)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-[#00A09D] bg-white dark:bg-[#13161c]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700">
            <Filter size={16} /> Filtros Avanzados
          </button>
        </div>
      )}

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <ProductGridView searchTerm={searchTerm} />
      ) : (
        <div className="rounded-xl border overflow-hidden bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
          {isOrdering ? (
            <CardProductEdit />
          ) : (
            <ProductTableView searchTerm={searchTerm} />
          )}
        </div>
      )}

      {/* Pagination - Hide when ordering */}
      {!isOrdering && (
        <div className="flex justify-center">
          <Paginator />
        </div>
      )}
    </div>
  );
}

export default function PageProducts() {
  return (
    <ProductProvider>
      <ProductsContent />
    </ProductProvider>
  );
}
