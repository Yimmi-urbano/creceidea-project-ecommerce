'use client';

import { createContext, useContext } from 'react';

export const SidebarContext = createContext<{
	isCollapsed: boolean;
	setIsCollapsed: (value: boolean) => void;
} | null>(null);

export const useSidebar = (): {
	isCollapsed: boolean;
	setIsCollapsed: (value: boolean) => void;
} => {
	const context = useContext(SidebarContext);
	if (context === null) {
		throw new Error('useSidebar must be used within SidebarProvider (SidebarContext.Provider)');
	}
	return context;
};
