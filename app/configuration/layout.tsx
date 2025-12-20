'use client';

import React, { useState } from 'react';

import { HeadToolbar } from '@/src/presentation/components/shared/headToolbar';
import Sidebar from '@/src/presentation/components/shared/sidebar';
import OptionsToolbar from '@/src/presentation/components/shared/toolbar';
import { ConfigProvider } from '@/src/presentation/contexts/ConfigContext';
import { SidebarContext } from '@/src/presentation/contexts/SidebarContext';
import { ThemeProvider } from '@/src/presentation/contexts/ThemeContext';

export default function ConfigurationLayout({ children }: { children: React.ReactNode }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<ThemeProvider>
			<ConfigProvider>
				<SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
					<div className="flex min-h-screen bg-zinc-50 dark:bg-dark-bg">
						<div className="hidden md:block">
							<Sidebar />
						</div>
						<main
							className={`flex-1 transition-all duration-300 overflow-x-hidden ${
								isCollapsed ? 'md:ml-20' : 'md:ml-64'
							}`}
						>
							<HeadToolbar />
							<div className="p-4 md:p-6 pb-24 md:pb-6">{children}</div>
						</main>
						<div className="md:hidden">
							<OptionsToolbar />
						</div>
					</div>
				</SidebarContext.Provider>
			</ConfigProvider>
		</ThemeProvider>
	);
}
