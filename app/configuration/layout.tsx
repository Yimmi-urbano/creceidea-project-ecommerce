"use client";

import React, { createContext, useContext, useState } from 'react';
import Sidebar from '@/src/presentation/components/shared/Sidebar';
import { HeadToolbar } from '@/src/presentation/components/shared/HeadToolbar';
import { ThemeProvider } from '@/src/presentation/contexts/ThemeContext';
import OptionsToolbar from '@/src/presentation/components/shared/Toolbar';
import { ConfigProvider } from '@/src/presentation/contexts/ConfigContext';

import { SidebarContext } from "@/src/presentation/contexts/SidebarContext";

export default function ConfigurationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <ThemeProvider>
            <ConfigProvider>
                <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
                    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#0f1115]">
                        <Sidebar />
                        <main
                            className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'
                                }`}
                        >
                            <HeadToolbar />
                            <div className="p-6 pb-24 md:pb-0">
                                {children}
                            </div>
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
