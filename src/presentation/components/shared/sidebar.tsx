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
import { useSidebar } from '@/app/dashboard/layout';

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'products', label: 'Catálogo', icon: ShoppingBag, href: '/dashboard/products' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, href: '/dashboard/orders' },
    { id: 'categories', label: 'Categorías', icon: Layers, href: '/dashboard/categories' },
    { id: 'payments', label: 'Métodos de Pago', icon: CreditCard, href: '/configuration/module/payments_method' },
  ];

  const accountNavItems = [
    { id: 'services', label: 'Mis Servicios', icon: Server, href: '/dashboard/services' },
    { id: 'billing', label: 'Mi Suscripción', icon: FileText, href: '/dashboard/billing' },
  ];

  const menuItems = [
    { label: 'Empresa', href: '/dashboard/company' },
    { label: 'Don Guston', href: '/dashboard/profile' },
    { label: 'Catálogo', href: '/dashboard/products' },
    { label: 'Sitio', href: '/site', external: true },
    { label: 'Redes Sociales', href: '/dashboard/social' },
    { label: 'Banner', href: '/dashboard/banner' },
    { label: 'Themes', href: '/dashboard/themes' },
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

        {/* User Profile with Dropdown */}
        <div className="relative" ref={menuRef}>
          {/* Floating Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-64 ml-4 rounded-2xl shadow-2xl border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 py-2 animate-in fade-in zoom-in duration-200 z-50">
              {/* Company Header */}
              <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <span className="text-lg font-bold text-zinc-600 dark:text-zinc-400">G</span>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Empresa</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Don Guston</p>
                  </div>
                </div>
                <a
                  href="https://donguston.creceidea.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  https://donguston.creceidea.pe
                  <ExternalLink size={12} />
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
              <img
                src="https://ui-avatars.com/api/?name=Don+Guston&background=00A09D&color=fff"
                alt="Avatar"
                className="w-9 h-9 rounded-full border-2 border-[#00A09D]/30"
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">Don Guston</p>
                  <p className="text-xs text-zinc-500 truncate">admin@creceidea.pe</p>
                </div>
              )}
            </button>
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
