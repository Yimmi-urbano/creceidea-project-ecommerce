'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Layers,
  CreditCard,
  Server,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '@nextui-org/react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'products', label: 'Catálogo', icon: ShoppingBag, href: '/dashboard/products' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, href: '/dashboard/orders' },
    { id: 'categories', label: 'Categorías', icon: Layers, href: '/dashboard/categories' },
    { id: 'payments', label: 'Métodos de Pago', icon: CreditCard, href: '/dashboard/payment-methods' },
  ];

  const accountNavItems = [
    { id: 'services', label: 'Mis Servicios', icon: Server, href: '/dashboard/services' },
    { id: 'billing', label: 'Mi Suscripción', icon: FileText, href: '/dashboard/billing' },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r flex flex-col bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 ${isCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-transparent shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00A09D] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#00A09D]/20">
              C
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl tracking-tight">
                crece<span className="text-[#00A09D]">idea</span>
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          {/* Main Menu */}
          <div className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Principal
              </p>
            )}
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${active
                      ? 'text-[#00A09D] bg-[#00A09D]/10 dark:bg-[#00A09D]/10'
                      : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                    }`}
                >
                  <Icon size={20} className={active ? 'text-[#00A09D]' : ''} />
                  {!isCollapsed && <span>{item.label}</span>}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#00A09D] rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Account Menu */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Mi Cuenta
                </p>
              </div>
            )}
            {accountNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${active
                      ? 'text-[#00A09D] bg-[#00A09D]/10 dark:bg-[#00A09D]/10'
                      : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                    }`}
                >
                  <Icon size={20} className={active ? 'text-[#00A09D]' : ''} />
                  {!isCollapsed && <span>{item.label}</span>}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#00A09D] rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t shrink-0 border-zinc-200 dark:border-zinc-800">
          <div className={`flex items-center gap-3 ${isCollapsed && 'justify-center'}`}>
            <img
              src="https://ui-avatars.com/api/?name=Don+Guston&background=00A09D&color=fff"
              alt="Avatar"
              className="w-9 h-9 rounded-full border-2 border-[#00A09D]/30"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Don Guston</p>
                <p className="text-xs text-zinc-500 truncate">admin@creceidea.pe</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#00A09D] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#008f8c] transition-colors z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
