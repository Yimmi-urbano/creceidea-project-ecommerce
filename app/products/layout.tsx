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
  
  return (
   
       <>
         {children}
      
       </>
  );
}
