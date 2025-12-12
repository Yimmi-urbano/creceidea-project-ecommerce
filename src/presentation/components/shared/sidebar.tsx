'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  ExternalLink,
  LogOut
} from 'lucide-react';
import { useSidebar } from '@/src/presentation/contexts/SidebarContext';
import { useConfig } from '@/src/presentation/contexts/ConfigContext';
import { Skeleton } from "@nextui-org/react";

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { config, loading } = useConfig();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [domain, setDomain] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(localStorage.getItem('domainSelect') || '');
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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

  const menuItems = [
    //{ label: 'Empresa', href: '/dashboard/company' },
    //{ label: 'Perfil', href: '/dashboard/profile' },
    { label: 'Catálogo', href: '/configuration/catalog' },
    { label: 'Ver Sitio', href: `https://${domain}`, external: true },
    { label: 'Redes Sociales', href: '/configuration/social' },
    { label: 'Banner', href: '/configuration/home' },
    { label: 'Temas', href: '/configuration/themes' },
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
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
              C
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl tracking-tight">
                crece<span className="text-primary">idea</span>
              </span>
            )}
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

        {/* User Profile with Dropdown */}
        <div className="relative" ref={menuRef}>
          {/* Floating Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-64 ml-4 rounded-2xl shadow-2xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 py-2 animate-in fade-in zoom-in duration-200 z-50">
              {/* Company Header */}
              <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                    {config?.logo ? (
                      <img src={config.logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-lg font-bold text-zinc-600 dark:text-zinc-400">
                        {config?.title?.charAt(0) || 'G'}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{config?.title || 'Empresa'}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{domain}</p>
                  </div>
                </div>
                <a
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-1 transition-colors truncate"
                >
                  {domain}
                  <ExternalLink size={12} className="shrink-0" />
                </a>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {item.external && <ExternalLink size={14} className="text-zinc-400" />}
                  </Link>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2">
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                  <LogOut size={16} />
                  Salir
                </button>
              </div>
            </div>
          )}

          {/* User Profile Button */}
          <div className="p-4 border-t shrink-0 border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-full flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg p-2 transition-colors ${isCollapsed && 'justify-center'}`}
            >
              <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border-2 border-primary/30 shrink-0">
                {config?.logo ? (
                  <img src={config.logo} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    {config?.title?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0 text-left">
                  {loading ? (
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-20 rounded" />
                      <Skeleton className="h-2 w-24 rounded" />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium truncate">{config?.title || 'Usuario'}</p>
                      <p className="text-xs text-zinc-500 truncate">{domain || 'Sin dominio'}</p>
                    </>
                  )}
                </div>
              )}
            </button>
          </div>
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
