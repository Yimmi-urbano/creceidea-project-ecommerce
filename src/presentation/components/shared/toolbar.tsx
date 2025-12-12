"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Layers,
    ShoppingCart,
    ShoppingBag,
    Globe
} from "lucide-react";

export default function OptionsToolbar() {
    const pathname = usePathname();

    const menuItems = [
        {
            label: 'Inicio',
            href: '/dashboard',
            icon: LayoutDashboard
        },
        {
            label: 'Categorías',
            href: '/dashboard/categories',
            icon: Layers
        },
        {
            label: 'Pedidos',
            href: '/dashboard/orders',
            icon: ShoppingCart
        },
        {
            label: 'Productos',
            href: '/dashboard/products',
            icon: ShoppingBag
        },
        {
            label: 'Sitio',
            href: '/configuration/site',
            icon: Globe
        }
    ];

    const isActive = (path: string) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 pointer-events-none">
            <div className="bg-white/90 dark:bg-[#13161c]/90 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-2xl pointer-events-auto mx-auto max-w-lg">
                <div className="flex justify-between items-center px-2 py-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group ${active
                                        ? 'text-[#00A09D]'
                                        : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                                    }`}
                            >
                                <div className={`relative p-1.5 rounded-lg transition-all duration-300 ${active ? 'bg-[#00A09D]/10 -translate-y-1' : 'group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800'
                                    }`}>
                                    <Icon size={20} className={active ? "stroke-[2.5px]" : "stroke-2"} />
                                    {active && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00A09D] rounded-full" />
                                    )}
                                </div>
                                <span className={`text-[10px] font-medium mt-1 transition-colors ${active ? 'text-[#00A09D]' : 'text-zinc-500'
                                    }`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

