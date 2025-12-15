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
  ChevronRight,
} from 'lucide-react';
import { useSidebar } from '@/src/presentation/contexts/SidebarContext';
import { Logo } from './Icons';
import UserButton from '@/src/presentation/components/client/user/UserButton';

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const mainNavItems = [
    { id: 'dashboard', label: 'Tablero', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'products', label: 'Catálogo', icon: ShoppingBag, href: '/dashboard/products' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, href: '/dashboard/orders' },
    { id: 'categories', label: 'Categorías', icon: Layers, href: '/dashboard/categories' },
    { id: 'payments', label: 'Métodos de Pago', icon: CreditCard, href: '/configuration/payment-methods' },
  ];

  const accountNavItems = [
    { id: 'services', label: 'Mis Servicios', icon: Server, href: '/dashboard/services' },
    { id: 'billing', label: 'Mi Suscripción', icon: FileText, href: '/dashboard/billing' },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r flex flex-col bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 ${isCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-transparent shrink-0">
          <div className="flex items-center gap-3">

            {!isCollapsed && (
              <Logo width={120} height={50} />
            )
              ||
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                C
              </div>
            }
          </div>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 scrollbar-hide">
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
                    ? 'text-primary bg-primary/10 dark:bg-primary/10'
                    : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                    }`}
                >
                  <Icon size={20} className={`shrink-0 ${active ? 'text-primary' : ''}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Account Menu */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Mi Cuenta</p>
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
                    ? 'text-primary bg-primary/10 dark:bg-primary/10'
                    : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                    }`}
                >
                  <Icon size={20} className={`shrink-0 ${active ? 'text-primary' : ''}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile - Using UserButton Component */}
        <div className="p-4 border-t shrink-0 border-zinc-200 dark:border-zinc-800">
          <UserButton isCollapsed={isCollapsed} showFullInfo={true} />
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-colors z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
