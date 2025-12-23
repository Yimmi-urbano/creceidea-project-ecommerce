'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowRight, Search } from 'lucide-react';

import {
    categoryLabels,
    searchableItems,
    type SearchableItem,
} from '@/src/presentation/data/searchableItems';
import { useGlobalSearchShortcut } from '@/src/presentation/hooks/useKeyboardShortcut';
import { fuzzySearch, highlightMatch } from '@/src/presentation/utils/fuzzySearch';

export const GlobalSearch: React.FC = () => {
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	// Detectar Cmd/Ctrl + K para abrir búsqueda
	useGlobalSearchShortcut(() => {
		setIsOpen(true);
		setTimeout(() => inputRef.current?.focus(), 100);
	});

	// Realizar búsqueda
	const results = useMemo(() => {
		return fuzzySearch(searchableItems, query, 8);
	}, [query]);

	// Agrupar resultados por categoría
	const groupedResults = useMemo(() => {
		const groups: Record<string, SearchableItem[]> = {};

		results.forEach((item) => {
			if (!groups[item.category]) {
				groups[item.category] = [];
			}
			groups[item.category].push(item);
		});

		return groups;
	}, [results]);

	// Resetear índice seleccionado cuando cambian los resultados
	useEffect(() => {
		setSelectedIndex(0);
	}, [results]);

	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Navegación por teclado
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!isOpen) {
				return;
			}

			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					setSelectedIndex((prev) => (prev + 1) % results.length);
					break;
				case 'ArrowUp':
					event.preventDefault();
					setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
					break;
				case 'Enter':
					event.preventDefault();
					if (results[selectedIndex]) {
						handleNavigate(results[selectedIndex].path);
					}
					break;
				case 'Escape':
					event.preventDefault();
					setIsOpen(false);
					inputRef.current?.blur();
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, results, selectedIndex]);

	// Navegar a la ruta seleccionada
	const handleNavigate = (path: string) => {
		router.push(path);
		setIsOpen(false);
		setQuery('');
		inputRef.current?.blur();
	};

	// Detectar si es Mac para mostrar el atajo correcto
	const isMac =
		typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
	const shortcutKey = isMac ? '⌘' : 'Ctrl';

	return (
		<div className="relative w-full max-w-md hidden md:block">
			{/* Input de búsqueda */}
			<div className="relative group">
				<Search
					size={16}
					className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
						isOpen ? 'text-primary' : 'text-zinc-400 group-focus-within:text-primary'
					}`}
				/>
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsOpen(true)}
					placeholder="Búsqueda global..."
					className="w-full pl-10 pr-20 py-2 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-primary focus:bg-white dark:focus:bg-dark-card text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600"
				/>

				{/* Atajo de teclado */}
				<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-zinc-400 pointer-events-none">
					<kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 font-mono">
						{shortcutKey}
					</kbd>
					<kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 font-mono">
						K
					</kbd>
				</div>
			</div>

			{/* Dropdown de resultados */}
			{isOpen && query.trim() && (
				<div
					ref={dropdownRef}
					className="absolute top-full left-0 right-0 mt-2 max-h-[480px] overflow-y-auto rounded-2xl shadow-2xl border bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-white/20 dark:border-white/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
				>
					{/* Gradient overlay para profundidad */}
					<div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none rounded-2xl" />

					{/* Inner glow */}
					<div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-none" />

					<div className="relative">
						{results.length > 0 ? (
							<>
								{Object.entries(groupedResults).map(([category, items], groupIndex) => (
									<div key={category}>
										{/* Categoría */}
										<div className="px-4 py-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
											{categoryLabels[category as SearchableItem['category']]}
										</div>

										{/* Items */}
										{items.map((item, itemIndex) => {
											const globalIndex = results.indexOf(item);
											const isSelected = globalIndex === selectedIndex;
											const Icon = item.icon;
											const highlightedTitle = highlightMatch(item.title, query);

											return (
												<button
													key={item.id}
													onClick={() => handleNavigate(item.path)}
													onMouseEnter={() => setSelectedIndex(globalIndex)}
													className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-150 group ${
														isSelected
															? 'bg-primary/10 dark:bg-primary/20 text-primary'
															: 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-white/5'
													}`}
												>
													{/* Icono */}
													<div
														className={`p-1.5 rounded-lg transition-all ${
															isSelected
																? 'bg-primary/15 dark:bg-primary/25 text-primary'
																: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
														}`}
													>
														<Icon size={16} />
													</div>

													{/* Contenido */}
													<div className="flex-1 text-left min-w-0">
														<div className="text-sm font-medium truncate">
															{highlightedTitle.map((segment, idx) => (
																<span
																	key={idx}
																	className={segment.highlight ? 'text-primary font-semibold' : ''}
																>
																	{segment.text}
																</span>
															))}
														</div>
														{item.description && (
															<div className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
																{item.description}
															</div>
														)}
													</div>

													{/* Flecha */}
													<ArrowRight
														size={14}
														className={`shrink-0 transition-transform ${
															isSelected ? 'translate-x-0.5' : ''
														}`}
													/>
												</button>
											);
										})}
									</div>
								))}

								{/* Footer con ayuda de navegación */}
								<div className="px-4 py-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
									<div className="flex items-center gap-3">
										<span className="flex items-center gap-1">
											<kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">
												↑↓
											</kbd>
											Navegar
										</span>
										<span className="flex items-center gap-1">
											<kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">
												↵
											</kbd>
											Abrir
										</span>
										<span className="flex items-center gap-1">
											<kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">
												Esc
											</kbd>
											Cerrar
										</span>
									</div>
								</div>
							</>
						) : (
							// Empty state
							<div className="px-4 py-8 text-center">
								<div className="w-12 h-12 mx-auto mb-3 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
									<Search size={20} className="text-zinc-400" />
								</div>
								<p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
									No se encontraron resultados
								</p>
								<p className="text-xs text-zinc-500 dark:text-zinc-400">
									Intenta con otros términos de búsqueda
								</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
