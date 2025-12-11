"use client"
import OptionsToolbar  from "@/src/presentation/components/shared/toolbar";
import Sidebar from "@/src/presentation/components/shared/sidebar";
import { ThemeSwitch } from "@/src/presentation/components/client/theme-switch";
import useIsMobile from "@/src/presentation/hooks/ui/useIsMobile";


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
