import React, { useState } from 'react';
import { Eye, Download, Edit3, CreditCard, Truck, Search } from 'lucide-react';
import withPermission from "@/src/presentation/components/client/withPermission";
import useIsOrders from '@/src/presentation/hooks/orders/useIsOrders';
import { updateOrderStatus, updatePaymentStatus } from '@/src/application/orders/orderServices';

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
    case 'pending':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
    case 'decline':
    case 'cancelled':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
    default:
      return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completado';
    case 'pending':
      return 'Pendiente';
    case 'decline':
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};

const getStatusDot = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-amber-500';
    case 'decline':
    case 'cancelled':
      return 'bg-rose-500';
    default:
      return 'bg-zinc-500';
  }
};

const Ordenes: React.FC = () => {
  const { orders, loading, error, refreshOrders } = useIsOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-rose-500">Error: {error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">No hay pedidos disponibles</p>
      </div>
    );
  }

  // Filter orders by search term
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const clientName = order.clientInfo?.first_name || order.clientInfo?.name || '';
    const clientLastName = order.clientInfo?.last_name || '';
    const fullName = `${clientName} ${clientLastName}`.toLowerCase();

    return (
      order.orderNumber.toLowerCase().includes(searchLower) ||
      fullName.includes(searchLower) ||
      order.total.toString().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Calculate stats
  const totalOrders = orders.length;
  const visibleOrders = filteredOrders.length;
  const completedOrders = orders.filter(o => o.paymentStatus?.typeStatus === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            placeholder="Buscar por N° orden, cliente, total..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none
              border-zinc-200 dark:border-zinc-800 focus:border-primary bg-white dark:bg-dark-card
            "
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total de Pedidos</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalOrders}</p>
        </div>
        <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Visibles</p>
          <p className="text-2xl font-bold text-primary">{visibleOrders}</p>
        </div>
        <div className="p-4 rounded-lg border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Completados</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedOrders}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase font-semibold bg-zinc-50 dark:bg-dark-bg text-zinc-500 dark:text-zinc-400">
            <tr>
              <th className="px-6 py-4">Pedido ID</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Fecha Compra</th>
              <th className="px-6 py-4">Fecha Pago</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {currentOrders.map((order) => {
              const productCount = order.products?.length || 0;
              const clientName = order.clientInfo?.first_name || order.clientInfo?.name || '';
              const clientLastName = order.clientInfo?.last_name || '';

              return (
                <tr
                  key={order._id}
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-primary">
                    #{order.orderNumber.substring(0, 13)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-900 dark:text-zinc-200">
                      {clientName} {clientLastName}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {productCount} producto{productCount !== 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {order.createdAt}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {order.paymentStatus?.date || '-'}
                  </td>
                  <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                    {order.currency === "PEN" ? "S/" : "$"} {order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit ${getStatusClass(order.paymentStatus?.typeStatus || 'pending')}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(order.paymentStatus?.typeStatus || 'pending')}`}></span>
                      {getStatusLabel(order.paymentStatus?.typeStatus || 'pending')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Edit Order Status */}
                      <button
                        className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        title="Editar estado de orden"
                      >
                        <Truck size={18} />
                      </button>

                      {/* Edit Payment Status */}
                      <button
                        className="p-2 rounded-lg text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        title="Editar estado de pago"
                      >
                        <CreditCard size={18} />
                      </button>

                      {/* View Details */}
                      <button
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Ver detalles"
                        onClick={() => window.location.href = `/dashboard/orders/details/${order.orderNumber}`}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Mostrando {startIndex + 1} a {Math.min(endIndex, filteredOrders.length)} de {filteredOrders.length} pedidos
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 
                hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Anterior
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors
                    ${page === currentPage
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 
                hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withPermission(Ordenes, 'ordenes');
