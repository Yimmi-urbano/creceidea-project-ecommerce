'use client';
import React, { useState } from 'react';

import Link from 'next/link';

import { Search, Filter, Plus, LayoutGrid, List, ArrowUpDown } from 'lucide-react';

import { updateProductOrder } from '@/src/application/products/productServices';
import CardProductEdit from '@/src/presentation/components/client/products/cardProductEdit';
import Paginator from '@/src/presentation/components/client/products/paginator';
import { ProductGridView } from '@/src/presentation/components/client/products/ProductGridView';
import { ProductTableView } from '@/src/presentation/components/client/products/ProductTableView';
import { ProductProvider, useProductContext } from '@/src/presentation/contexts';

function ProductsContent() {
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
	const [searchTerm, setSearchTerm] = useState('');
	const { isOrdering, setIsOrdering, orderedProducts, fetchProducts, products, isLoading } =
		useProductContext();

	/**
	 * Product Filtering and Statistics
	 *
	 * This component implements dynamic filtering and real-time statistics calculation
	 * for the product catalog. The summary cards update automatically based on search results.
	 *
	 * @filtering
	 * - Products are filtered by title (case-insensitive)
	 * - Search term is matched against product.title
	 * - Empty search shows all products
	 *
	 * @statistics
	 * The component calculates 4 key metrics:
	 *
	 * 1. totalProducts (number)
	 *    - Total count of ALL products in the catalog
	 *    - Never changes with search (shows original total)
	 *    - Used when searchTerm is empty
	 *
	 * 2. visibleProducts (number)
	 *    - Count of products matching the search term
	 *    - Updates in real-time as user types
	 *    - Displayed when searchTerm has value
	 *    - Label changes from "Total de Productos" to "Visibles"
	 *    - Color changes from zinc to primary (blue) to highlight filtered state
	 *
	 * 3. activeProducts (number)
	 *    - Count of products with is_available = true
	 *    - Calculated from FILTERED results (not total)
	 *    - Updates based on visible products
	 *    - Color: emerald (green) - indicates positive status
	 *
	 * 4. outOfStockProducts (number)
	 *    - Count of products with stock = 0 or undefined
	 *    - Calculated from FILTERED results (not total)
	 *    - Updates based on visible products
	 *    - Color: rose (red) - indicates alert status
	 *
	 * @example
	 * // Without search:
	 * // "Total de Productos: 15" (zinc)
	 * // "Activos: 12" (emerald)
	 * // "Sin Stock: 3" (rose)
	 *
	 * @example
	 * // With search "Inka":
	 * // "Visibles: 3" (primary - blue)
	 * // "Activos: 2" (emerald - from 3 visible)
	 * // "Sin Stock: 1" (rose - from 3 visible)
	 *
	 * @behavior
	 * - Summary cards are hidden when isOrdering = true
	 * - Skeleton loaders shown during initial data fetch
	 * - All statistics update instantly on search input change
	 * - Filter logic uses safe navigation (?.) to prevent errors
	 */

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

	// Filter products by search term
	const filteredProducts =
		products?.filter((p: any) => p.title?.toLowerCase().includes(searchTerm.toLowerCase())) || [];

	// Calculate stats based on filtered results
	const totalProducts = products?.length || 0;
	const visibleProducts = filteredProducts.length;
	const activeProducts = filteredProducts.filter((p: any) => p.is_available)?.length || 0;
	const outOfStockProducts =
		filteredProducts.filter((p: any) => p.stock === 0 || !p.stock)?.length || 0;

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
					<div className="hidden md:flex p-1 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
						<button
							onClick={() => setViewMode('grid')}
							className={`p-1.5 rounded-md transition-all ${
								viewMode === 'grid'
									? 'bg-primary/10 text-primary'
									: 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
							}`}
						>
							<LayoutGrid size={18} />
						</button>
						<button
							onClick={() => setViewMode('list')}
							className={`p-1.5 rounded-md transition-all ${
								viewMode === 'list'
									? 'bg-primary/10 text-primary'
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
							className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-primary hover:text-primary"
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
								className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-primary/25 transition-all"
							>
								Guardar
							</button>
							<button
								onClick={() => setIsOrdering(false)}
								className="flex items-center gap-2 border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white dark:bg-dark-card"
							>
								Cancelar
							</button>
						</>
					)}

					{/* Add Button - Hide when ordering */}
					{!isOrdering && (
						<Link href="/dashboard/products/create">
							<button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-primary/25 transition-all">
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
							className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors"
						/>
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Buscar productos..."
							className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-primary bg-white dark:bg-dark-card"
						/>
					</div>
					<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700">
						<Filter size={16} /> Filtros Avanzados
					</button>
				</div>
			)}

			{/* Summary Stats - Hide when ordering */}
			{!isOrdering &&
				(isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 animate-pulse"
							>
								<div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded mb-2" />
								<div className="h-8 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
							<p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1">
								{searchTerm ? 'Visibles' : 'Total de Productos'}
							</p>
							<p
								className={`text-2xl font-bold ${searchTerm ? 'text-primary' : 'text-zinc-900 dark:text-white'}`}
							>
								{searchTerm ? visibleProducts : totalProducts}
							</p>
						</div>
						<div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
							<p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1">Activos</p>
							<p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
								{activeProducts}
							</p>
						</div>
						<div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
							<p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1">Sin inventario</p>
							<p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
								{outOfStockProducts}
							</p>
						</div>
					</div>
				))}

			{/* Products Grid/List */}
			{viewMode === 'grid' ? (
				<ProductGridView searchTerm={searchTerm} />
			) : (
				<div className="rounded-xl border overflow-hidden bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
					{isOrdering ? <CardProductEdit /> : <ProductTableView searchTerm={searchTerm} />}
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
