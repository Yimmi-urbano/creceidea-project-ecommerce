'use client';

import React from 'react';
import { useTheme } from '@/src/presentation/contexts';
import { Bell, Sun, Moon } from 'lucide-react';
import { Logo } from './Icons';
import { GlobalSearch } from './GlobalSearch';

export const HeadToolbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>


      <div className="sticky top-0 z-30 h-16 px-6 flex items-center justify-between border-b backdrop-blur-xl bg-opacity-80 bg-white/80 dark:bg-dark-bg border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4 flex-1">

          <div className='md:hidden'>
            <Logo width={120} height={50} />
          </div>

          {/* Global Search */}
          <GlobalSearch />
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
