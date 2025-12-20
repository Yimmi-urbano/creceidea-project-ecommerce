'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LayoutDashboard, Layers, ShoppingCart, ShoppingBag, Globe } from 'lucide-react';

export default function OptionsToolbar() {
	const pathname = usePathname();

	const menuItems = [
		{
			label: 'Inicio',
			href: '/dashboard',
			icon: LayoutDashboard,
		},
		{
			label: 'Categorías',
			href: '/dashboard/categories',
			icon: Layers,
		},
		{
			label: 'Pedidos',
			href: '/dashboard/orders',
			icon: ShoppingCart,
		},
		{
			label: 'Productos',
			href: '/dashboard/products',
			icon: ShoppingBag,
		},
		{
			label: 'Sitio',
			href: '/configuration/site',
			icon: Globe,
		},
	];

	const isActive = (path: string) => {
		if (path === '/dashboard' && pathname === '/dashboard') {
			return true;
		}
		if (path !== '/dashboard' && pathname.startsWith(path)) {
			return true;
		}
		return false;
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 pointer-events-none">
			{/* Glass container with premium glassmorphism effect */}
			<div className="relative bg-white/70 dark:bg-zinc-900/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/20 rounded-3xl pointer-events-auto mx-auto max-w-lg overflow-hidden">
				{/* Subtle gradient overlay for depth */}
				<div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

				{/* Inner glow effect */}
				<div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-none" />

				{/* Content */}
				<div className="relative flex justify-between items-center px-2 py-2">
					{menuItems.map((item) => {
						const Icon = item.icon;
						const active = isActive(item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 group ${
									active
										? 'text-primary'
										: 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
								}`}
							>
								<div
									className={`relative p-1.5 rounded-xl transition-all duration-300 ${
										active
											? 'bg-primary/15 dark:bg-primary/20 -translate-y-1 shadow-lg shadow-primary/20'
											: 'group-hover:bg-zinc-100/80 dark:group-hover:bg-white/10 group-hover:backdrop-blur-sm'
									}`}
								>
									<Icon size={20} className={active ? 'stroke-[2.5px]' : 'stroke-2'} />
									{active && (
										<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse" />
									)}
								</div>
								<span
									className={`text-[10px] font-semibold mt-1.5 transition-all duration-300 ${
										active
											? 'text-primary'
											: 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200'
									}`}
								>
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
