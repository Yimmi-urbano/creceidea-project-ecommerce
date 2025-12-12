"use client"
import { useState, createContext, useContext } from "react";
import OptionsToolbar from "@/src/presentation/components/shared/toolbar";
import Sidebar from "@/src/presentation/components/shared/sidebar";
import { HeadToolbar } from "@/src/presentation/components/shared/headToolbar";
import { ThemeProvider } from "@/src/presentation/contexts";
import { ConfigProvider } from "@/src/presentation/contexts/ConfigContext";

import { SidebarContext } from "@/src/presentation/contexts/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <ConfigProvider>
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
          <div className="min-h-screen font-sans transition-colors duration-300 bg-zinc-50 dark:bg-[#0f1115] text-zinc-900 dark:text-zinc-100">
            {/* Desktop Sidebar */}
            <div className="md:flex hidden">
              <Sidebar />
            </div>

            {/* Mobile Toolbar */}
            <div className="md:hidden visible">
              <OptionsToolbar />
            </div>

            {/* Main Content - adapts to sidebar state */}
            <main className={`transition-all duration-300 min-h-screen flex flex-col ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
              <HeadToolbar />
              <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
                {children}
              </div>
            </main>
          </div>
        </SidebarContext.Provider>
      </ConfigProvider>
    </ThemeProvider>
  );
}
