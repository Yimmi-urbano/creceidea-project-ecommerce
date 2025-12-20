'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Skeleton } from '@nextui-org/react';
import { ExternalLink, LogOut } from 'lucide-react';

import { useConfig } from '@/src/presentation/contexts';

interface UserButtonProps {
	isCollapsed?: boolean;
	className?: string;
	showFullInfo?: boolean;
}

export default function UserButton({
	isCollapsed = false,
	className = '',
	showFullInfo = true,
}: UserButtonProps) {
	const { config, loading } = useConfig();
	const [domain, setDomain] = useState<string>('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const domainSelect = localStorage.getItem('domainSelect') || '';
			setDomain(domainSelect);
		}
	}, []);

	const menuItems: { label: string; href: string; external?: boolean }[] = [
		{ label: 'Catálogo', href: '/configuration/catalog' },
		{ label: 'Ver Sitio', href: '/configuration/site' },
		{ label: 'Redes Sociales', href: '/configuration/social' },
		{ label: 'Banner', href: '/configuration/home' },
		{ label: 'Temas', href: '/configuration/themes' },
	];

	return (
		<div className={`relative ${className}`}>
			{/* Floating Dropdown Menu */}
			{isMenuOpen && (
				<>
					{/* Backdrop */}
					<div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />

					<div className="absolute bottom-full left-0 mb-2 w-64 ml-4 rounded-2xl shadow-2xl border bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 py-2 animate-in fade-in zoom-in duration-200 z-50">
						{/* Company Header */}
						<div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
							<div className="flex items-center gap-3 mb-2">
								<div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
									{config?.logo ? (
										<img
											src={config.logo}
											alt="Logo"
											className="w-full object-cover rounded-full"
										/>
									) : (
										<span className="text-lg font-bold text-zinc-600 dark:text-zinc-400">
											{config?.title?.charAt(0) || 'G'}
										</span>
									)}
								</div>
								<div className="min-w-0">
									<p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
										{config?.title || 'Empresa'}
									</p>
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
							{menuItems.map((item, index) =>
								item.external ? (
									<a
										key={index}
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-between px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										{item.label}
										<ExternalLink size={14} className="text-zinc-400" />
									</a>
								) : (
									<Link
										key={index}
										href={item.href}
										className="flex items-center justify-between px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										{item.label}
									</Link>
								)
							)}
						</div>

						{/* Logout */}
						<div className="border-t border-zinc-200 dark:border-zinc-800 pt-2">
							<button
								onClick={() => {
									import('@/src/infrastructure/storage/localStorage').then(({ logout }) => {
										logout();
									});
								}}
								className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-left"
							>
								<LogOut size={16} />
								Salir
							</button>
						</div>
					</div>
				</>
			)}

			{/* User Profile Button */}
			<button
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className={`w-full flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg p-2 transition-colors ${isCollapsed && 'justify-center'}`}
			>
				<div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center border-2 border-primary/30 shrink-0">
					{config?.logo ? (
						<img src={config.logo} alt="Avatar" className="w-full object-cover rounded-full" />
					) : (
						<span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
							{config?.title?.charAt(0).toUpperCase() || 'U'}
						</span>
					)}
				</div>
				{!isCollapsed && showFullInfo && (
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
	);
}
