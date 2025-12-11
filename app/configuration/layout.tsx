"use client";

import React, { createContext, useContext, useState } from 'react';
import Sidebar from '@/src/presentation/components/shared/sidebar';
import { HeadToolbar } from '@/src/presentation/components/shared/headToolbar';
import { ThemeProvider } from '@/src/presentation/contexts/ThemeContext';

const SidebarContext = createContext<{
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
} | null>(null);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }
    return context;
};

export default function ConfigurationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <ThemeProvider>
            <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
                <div className="flex min-h-screen bg-zinc-50 dark:bg-[#0f1115]">
                    <Sidebar />
                    <main
                        className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'
                            }`}
                    >
                        <HeadToolbar />
                        <div className="p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarContext.Provider>
        </ThemeProvider>
    );
}
