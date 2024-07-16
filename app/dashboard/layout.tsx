"use client"
import OptionsToolbar  from "@/components/toolbar";
import Sidebar from "@/components/sidebar";
import { ThemeSwitch } from "@/components/theme-switch";
import useIsMobile from "@/hooks/useIsMobile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return (
   
       <div className="flex h-screen"> 
        <div className="logo-crece-dash z-index-3"><ThemeSwitch /></div> 
        {!isMobile && <Sidebar />}
        {isMobile && <OptionsToolbar/> }
       <div className="flex-1 p-4">
         {children}
       </div>
       </div>
  );
}
