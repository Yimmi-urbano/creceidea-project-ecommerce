'use client';

import React, { useMemo } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Percent
} from 'lucide-react';
import { KPICard } from '@/src/presentation/components/dashboard/KPICard';
import { SalesChart } from '@/src/presentation/components/dashboard/SalesChart';
import { TopProductsChart } from '@/src/presentation/components/dashboard/TopProductsChart';
import { OrdersDonutChart } from '@/src/presentation/components/dashboard/OrdersDonutChart';
import { CategorySalesChart } from '@/src/presentation/components/dashboard/CategorySalesChart';
import { RecentOrdersTable } from '@/src/presentation/components/dashboard/RecentOrdersTable';
import {
  generateSalesData,
  generateTopProductsData,
  generateOrdersData,
  generateCategorySalesData,
  generateRecentOrders,
  calculateKPIs
} from '@/src/utils/dashboardData';

export default function DashboardPage() {
  // Generate all data once using useMemo
  const salesData = useMemo(() => generateSalesData(), []);
  const topProductsData = useMemo(() => generateTopProductsData(), []);
  const ordersData = useMemo(() => generateOrdersData(), []);
  const categorySalesData = useMemo(() => generateCategorySalesData(), []);
  const recentOrders = useMemo(() => generateRecentOrders(), []);
  const kpis = useMemo(() => calculateKPIs(), []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            Dashboard Analytics
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Bienvenido de vuelta! Aquí está tu resumen de negocio.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 outline-none focus:border-[#00A09D]">
            <option>Últimos 30 días</option>
            <option>Últimos 7 días</option>
            <option>Este mes</option>
            <option>Este año</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="xl:col-span-2">
          <KPICard
            title="Ventas Totales"
            value={`S/ ${kpis.totalSales.toLocaleString()}`}
            change={kpis.salesChange}
            icon={DollarSign}
            iconColor="bg-green-500"
          />
        </div>
        <div className="xl:col-span-2">
          <KPICard
            title="Pedidos Totales"
            value={kpis.totalOrders}
            change={kpis.ordersChange}
            icon={ShoppingCart}
            iconColor="bg-blue-500"
          />
        </div>
        <KPICard
          title="Productos Activos"
          value={kpis.activeProducts}
          icon={Package}
          iconColor="bg-purple-500"
          changeLabel="en catálogo"
        />
        <KPICard
          title="Conversión"
          value={`${kpis.conversionRate}%`}
          change={0.5}
          icon={Percent}
          iconColor="bg-orange-500"
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KPICard
          title="Ticket Promedio"
          value={`S/ ${kpis.averageTicket}`}
          change={3.2}
          icon={TrendingUp}
          iconColor="bg-[#00A09D]"
        />
        <KPICard
          title="Clientes Nuevos"
          value={kpis.newCustomers}
          change={12.5}
          icon={Users}
          iconColor="bg-pink-500"
          changeLabel="este mes"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart - Full Width on Mobile, Half on Desktop */}
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>

        {/* Top Products */}
        <TopProductsChart data={topProductsData} />

        {/* Orders Donut */}
        <OrdersDonutChart data={ordersData} />

        {/* Category Sales - Full Width */}
        <div className="lg:col-span-2">
          <CategorySalesChart data={categorySalesData} />
        </div>
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable orders={recentOrders} />

      {/* Footer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl border bg-gradient-to-br from-[#00A09D]/5 to-transparent border-[#00A09D]/20">
        <div className="text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Productos Más Vendido
          </p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {topProductsData[0]?.name}
          </p>
          <p className="text-xs text-[#00A09D]">
            {topProductsData[0]?.sales} unidades
          </p>
        </div>
        <div className="text-center border-x border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Mejor Día de Ventas
          </p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {salesData.reduce((max, day) => day.sales > max.sales ? day : max, salesData[0]).date}
          </p>
          <p className="text-xs text-[#00A09D]">
            S/ {salesData.reduce((max, day) => day.sales > max.sales ? day : max, salesData[0]).sales}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Tasa de Éxito
          </p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {Math.round((ordersData.find(o => o.name === 'Completados')?.value || 0) /
              ordersData.reduce((sum, o) => sum + o.value, 0) * 100)}%
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">
            Pedidos completados
          </p>
        </div>
      </div>
    </div>
  );
}
