"use client"
import { useState, createContext, useContext } from "react";
import OptionsToolbar from "@/src/presentation/components/shared/toolbar";
import Sidebar from "@/src/presentation/components/shared/sidebar";
import { HeadToolbar } from "@/src/presentation/components/shared/headToolbar";
import { ThemeProvider } from "@/src/presentation/contexts";

// Create context for sidebar state
const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeProvider>
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
          <main className={`transition-all duration-300 min-h-screen flex flex-col ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
            <HeadToolbar />
            <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarContext.Provider>
    </ThemeProvider>
  );
}
