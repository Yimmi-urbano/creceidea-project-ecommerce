'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/src/presentation/contexts';
import { Search, Bell, Sun, Moon } from 'lucide-react';

export const HeadToolbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="sticky top-0 z-30 h-16 px-6 flex items-center justify-between border-b backdrop-blur-xl bg-opacity-80 bg-white/80 dark:bg-dark-bg/80 border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4 flex-1">
          {/* Global Search */}
          <div className="relative w-full max-w-md hidden md:block group">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Búsqueda global..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-transparent border transition-all duration-200 outline-none border-zinc-200 dark:border-zinc-800 focus:border-primary focus:bg-white dark:focus:bg-dark-card text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-yellow-400"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-transparent"></span>
          </button>
        </div>
      </div>
    </>
  );
};
