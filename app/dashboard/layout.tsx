"use client"
import OptionsToolbar from "@/src/presentation/components/shared/toolbar";
import Sidebar from "@/src/presentation/components/shared/sidebar";
import { HeadToolbar } from "@/src/presentation/components/shared/headToolbar";
import { ThemeProvider } from "@/src/presentation/contexts";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans transition-colors duration-300 bg-zinc-50 dark:bg-[#0f1115] text-zinc-900 dark:text-zinc-100">
        {/* Desktop Sidebar */}
        <div className="md:flex hidden">
          <Sidebar />
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden visible">
          <OptionsToolbar />
        </div>

        {/* Main Content */}
        <main className="transition-all duration-300 min-h-screen flex flex-col ml-64">
          <HeadToolbar />
          <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
