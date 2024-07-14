"use client"
import { Logo } from "@/components/icons";
import Sidebar from "@/components/sidebar";
import { ThemeSwitch } from "@/components/theme-switch";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
       <div className="flex h-screen"> 
        <div className="logo-crece-dash z-index-3"><ThemeSwitch /></div> 
         <Sidebar/>
       <div className="flex-1 p-4">
         {children}
       </div>
       </div>
  );
}
